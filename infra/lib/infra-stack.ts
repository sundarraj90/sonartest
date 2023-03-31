import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import { envSpecific, getDeployEnv } from './util'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'

const mainDomain = 'itero.link'
const siteDomain = `${getDeployEnv()}-marshmallow.itero.link`
export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'itero-domain-cert',
      'arn:aws:acm:us-east-1:633625839783:certificate/05bbcbca-4cff-4919-8859-50b2109b13ea'
    )

    // S3
    const bucket = new s3.Bucket(this, envSpecific('marshmallow-portal'), {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html'
    })

    // Cloudfront
    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      envSpecific('marshmallow-distribution'),
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ],
        errorConfigurations: [
          {
            errorCode: 403,
            errorCachingMinTtl: 10,
            responseCode: 200,
            responsePagePath: '/index.html'
          }
        ],
        viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [siteDomain]
          }
        )
      }
    )

    // Deployment
    new s3Deploy.BucketDeployment(
      this,
      envSpecific('marshmallow-portal-deployment'),
      {
        sources: [s3Deploy.Source.asset('../build')],
        destinationBucket: bucket,
        distribution,
        distributionPaths: ['/*']
      }
    )

    // Create a Route53 hosted zone for the domain
    const hostedZone = new route53.HostedZone(this, 'ReactAppHostedZone', {
      zoneName: mainDomain
    })

    // Create a Route53 record set that points to the CloudFront distribution
    const recordSet = new route53.ARecord(this, 'reactAppRecordSet', {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(
        new CloudFrontTarget(distribution)
      ),
      zone: hostedZone
    })
  }
}
