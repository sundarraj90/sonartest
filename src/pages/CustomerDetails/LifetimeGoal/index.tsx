import { Box, Card, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  getCustomerMonthlyDepositbyId,
  getCustomerRetirementDetailsbyId,
} from 'service/CustomerService';
import Chart from './Chart';
interface ILifetimeGoal {
  current_age: number;
  retire_age: number;
  ret_Income: number;
}

interface IMonthlyDeposit {
  monthly_topup: number;
  initial_deposit: number;
}

const LifetimeGoal = (): JSX.Element => {
  const { id } = useParams();
  const [lifetimeGoal, setLifetimeGoal] = useState<ILifetimeGoal>({
    current_age: 0,
    retire_age: 0,
    ret_Income: 0,
  });
  const [monthlyDeposit, setMonthlyDeposit] = useState<IMonthlyDeposit>({
    monthly_topup: 0,
    initial_deposit: 0,
  });

  const customerLifetimeGoalDetails = async (CustId: string): Promise<void> => {
    try {
      const resRetire = (await getCustomerRetirementDetailsbyId(
        String(CustId),
      )) as { retirementData: ILifetimeGoal };
      setLifetimeGoal(resRetire.retirementData);
      const resPayment = (await getCustomerMonthlyDepositbyId(
        String(CustId),
      )) as IMonthlyDeposit;
      setMonthlyDeposit(resPayment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void customerLifetimeGoalDetails(String(id));
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Paper>
        <Grid
          container
          spacing={10}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Card elevation={2} sx={{ p: 2, m: 3 }}>
              <Typography
                component="h1"
                variant="h5"
                fontSize="14px"
                fontFamily={['Inter']}
                color="#898989"
              >
                Lifetime goal
              </Typography>
              {lifetimeGoal?.ret_Income ? (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  {'\u20AC'}{' '}
                  {(
                    (80 - lifetimeGoal?.current_age) *
                    lifetimeGoal?.ret_Income
                  ).toLocaleString()}
                </Typography>
              ) : (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  -
                </Typography>
              )}
            </Card>

            <Card elevation={2} sx={{ p: 2, m: 3 }}>
              <Typography
                component="h1"
                variant="h5"
                fontSize="14px"
                fontFamily={['Inter']}
                color="#898989"
              >
                Age of retirement
              </Typography>
              {lifetimeGoal?.retire_age ? (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  {lifetimeGoal.retire_age ? lifetimeGoal.retire_age : <p>-</p>}{' '}
                  years
                </Typography>
              ) : (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  -
                </Typography>
              )}
            </Card>
            <Card elevation={2} sx={{ p: 2, m: 3 }}>
              <Typography
                component="h1"
                variant="h5"
                fontSize="14px"
                fontFamily={['Inter']}
                color="#898989"
              >
                Retirement income
              </Typography>
              {lifetimeGoal?.ret_Income ? (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  {'\u20AC'} {(lifetimeGoal?.ret_Income || 0).toLocaleString()}
                </Typography>
              ) : (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  -
                </Typography>
              )}
            </Card>
            <Card elevation={2} sx={{ p: 2, m: 3 }}>
              <Typography
                component="h1"
                variant="h5"
                fontSize="14px"
                fontFamily={['Inter']}
                color="#898989"
              >
                Initial deposit
              </Typography>
              {monthlyDeposit?.initial_deposit ? (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  {'\u20AC'}{' '}
                  {(monthlyDeposit?.initial_deposit || 0).toLocaleString()}
                </Typography>
              ) : (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  -
                </Typography>
              )}
            </Card>
            <Card elevation={2} sx={{ p: 2, m: 3 }}>
              <Typography
                component="h1"
                variant="h5"
                fontSize="14px"
                fontFamily={['Inter']}
                color="#898989"
              >
                Monthly deposit
              </Typography>
              {monthlyDeposit?.monthly_topup ? (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  {'\u20AC'}{' '}
                  {(monthlyDeposit?.monthly_topup || 0).toLocaleString()}
                </Typography>
              ) : (
                <Typography
                  component="h1"
                  variant="h5"
                  fontFamily={['Inter']}
                  fontWeight={700}
                  fontSize="20px"
                >
                  -
                </Typography>
              )}
            </Card>
          </Grid>
          <Grid item xs={6} pb={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chart
                retireAge={lifetimeGoal?.retire_age}
                presentAge={lifetimeGoal?.current_age}
              />
            </Box>

            {lifetimeGoal?.retire_age ? (
              <Box
                sx={{
                  width: '100%',
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#78B894',
                      width: 8,
                      height: 8,
                      borderRadius: 10,
                      mb: 1,
                    }}
                  />
                  <Typography fontFamily="Inter" fontSize="14px">
                    Savings
                  </Typography>
                  <Typography
                    fontFamily="Inter"
                    fontSize="14px"
                    fontWeight={600}
                  >
                    €3,240
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#E15B2D',
                      width: 8,
                      height: 8,
                      borderRadius: 10,
                      mb: 1,
                    }}
                  />
                  <Typography fontFamily="Inter" fontSize="14px">
                    Government
                  </Typography>
                  <Typography
                    fontFamily="Inter"
                    fontSize="14px"
                    fontWeight={600}
                  >
                    €1,101
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#DEBD1B',
                      width: 8,
                      height: 8,
                      borderRadius: 10,
                      mb: 1,
                    }}
                  />
                  <Typography fontFamily="Inter" fontSize="14px">
                    Return
                  </Typography>
                  <Typography
                    fontFamily="Inter"
                    fontSize="14px"
                    fontWeight={600}
                  >
                    €1,890
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box></Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LifetimeGoal;
