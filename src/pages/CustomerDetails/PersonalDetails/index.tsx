import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCustomerById } from 'service/CustomerService';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { colorTheme } from 'theme';
import Avatar from '@mui/material/Avatar';
import { type ICustomerResponse, type IReuseGridProps } from 'types';

const PersonalDetails = (): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const [customerInfo, setCustomerInfo] = useState<ICustomerResponse>();
  const [image, setImage] = useState('');
  const { id } = useParams();

  const getCustomerData = async (): Promise<void> => {
    try {
      const response = (await getCustomerById(Number(id))) as ICustomerResponse;
      setCustomerInfo(
        response?.basicInfo as unknown as ICustomerResponse | undefined,
      );
      if (response?.basicInfo?.profileImage) {
        const profileImgUrl = `${String(
          process.env.REACT_APP_MARSHMALLOW_API,
        )}api/admin/customer-profile/${response?.basicInfo?.profileImage}`;
        setImage(profileImgUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      void getCustomerData();
    }
  }, []);

  const ReuseGrid = (props: IReuseGridProps): JSX.Element => (
    <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', padding: 1 }}>
      <Grid item xs={4} sm={4} md={4}>
        <Typography
          component="h5"
          variant="h5"
          color="#838383"
          fontWeight={700}
          fontSize={16}
          fontFamily="Inter !important"
        >
          {props.customName}
        </Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <Typography>:</Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <Typography
          component="h5"
          variant="h5"
          color={colors.gray[100]}
          fontWeight={700}
          fontSize={16}
          fontFamily="Inter !important"
        >
          {props.customerDetails}
        </Typography>
      </Grid>
    </Grid>
  );
  return (
    <Box>
      {/* <Header title="Personal Details" /> */}
      <Paper
        sx={{
          margin: 'auto',
          // maxWidth: 500,
          flexGrow: 1,
        }}
      >
        <Grid container item xs={12} sm={12} md={12}>
          <Grid item xs={3} sm={3} md={3}>
            <Box
              sx={{
                padding: 2,
              }}
            >
              <Typography
                component="h5"
                variant="h5"
                color={colors.greenAccent[500]}
                fontWeight={800}
                fontSize={18}
                fontFamily="Inter !important"
                sx={{
                  textAlign: 'center',
                  marginBlock: 2,
                }}
              >
                Profile picture
              </Typography>
              <Box marginBottom={5}></Box>
              <Box
                sx={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                {customerInfo?.profileImage && customerInfo?.profileImage ? (
                  <Avatar
                    sx={{
                      height: '100px',
                      width: '100px',
                      alignSelf: 'center',
                      bgcolor: '#e4dfed',
                      color: '#202020',
                      fontWeight: 700,
                      fontSize: 40,
                    }}
                    alt="img"
                    src={image}
                  />
                ) : (
                  // <img src={image} />
                  <Avatar
                    sx={{
                      width: '100px',
                      height: '100px',
                      alignSelf: 'center',
                      bgcolor: '#B5DFC8',
                      color: '#202020',
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      fontSize: 40,
                    }}
                  >
                    {customerInfo?.firstName &&
                      customerInfo?.firstName.slice(0, 1) +
                        customerInfo?.lastName.slice(0, 1)}
                  </Avatar>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={8} sm={8} md={8} sx={{ marginBlock: 2 }}>
            <Box marginTop={1}></Box>
            <ReuseGrid
              customName="Full name"
              customerDetails={
                customerInfo?.firstName
                  ? `${customerInfo?.firstName} ${customerInfo?.lastName}`
                  : '-'
              }
            />
            <ReuseGrid
              customName="Email address"
              customerDetails={customerInfo?.email ? customerInfo?.email : '-'}
            />
            <ReuseGrid
              customName="Phone number"
              customerDetails={
                customerInfo?.phone
                  ? `+${customerInfo?.callingCode} ${customerInfo?.phone}`
                  : '-'
              }
            />
            <Divider sx={{ marginBlock: 2 }} />
            <ReuseGrid
              customName="Country of birth"
              customerDetails={
                customerInfo?.country ? customerInfo?.country : '-'
              }
            />
            <ReuseGrid
              customName="Citizenship"
              customerDetails={
                customerInfo?.citizenship ? customerInfo?.citizenship : '-'
              }
            />
            <ReuseGrid
              customName="Date of birth"
              customerDetails={customerInfo?.dob ? customerInfo?.dob : '-'}
            />
            <ReuseGrid
              customName="Address"
              customerDetails={
                customerInfo?.address ? customerInfo?.address : '-'
              }
            />

            <Divider sx={{ marginBlock: 2 }} />
            <ReuseGrid
              customName="Employment status"
              customerDetails={
                customerInfo?.employmentStatus
                  ? customerInfo?.employmentStatus
                  : '-'
              }
            />
            <ReuseGrid
              customName="PPSN"
              customerDetails={
                customerInfo?.ppsnNumber ? customerInfo?.ppsnNumber : '-'
              }
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PersonalDetails;
