import Header from 'components/Header';
import { Box, useTheme, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';
import { colorTheme } from '../../theme';
import PersonalDetails from './PersonalDetails';
import Dashboard from './Dashboard';
import ProfileStatus from './ProfileStatus';
import LifetimeGoal from './LifetimeGoal';
import PlanDetails from './PlanDetails';
import Payments from './Payments';
import Transactions from './Transactions';
import PensionAggregate from './PensionAggregate';
import Chats from './Chats';
import Referrals from './Referrals';
import ComplaintsRaised from './ComplaintsRaised';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: '75vh' }}>{children}</Box>}
    </div>
  );
}

const CustomerDetails = (): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);

  /* Tab Menu */
  const [value, setValue] = useState(0);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <Box>
      <Header title="Customer details" />

      {/* Seporator */}
      <Box py={2} />

      {/* GRID & CHARTS */}
      <Box
        sx={{
          maxWidth: {
            xs: 320,
            sm: 480,
            md: '100%',
          },
          borderRadius: 3,
          px: 2,
          boxShadow: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="secondary"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: colors.greenAccent[600],
            },
          }}
          sx={{
            '& .MuiTab-root.Mui-selected': {
              color: colors.greenAccent[500],
            },
          }}
        >
          <Tab label="Dashboard" />
          <Tab label="Personal details" />
          <Tab label="Profile status" />
          <Tab label="Lifetime goals" />
          <Tab label="Plan details" />
          <Tab label="Payments" />
          <Tab label="Transactions" />
          <Tab label="Pension aggregate" />
          <Tab label="Chats" />
          <Tab label="Referrals" />
          <Tab label="Complaints raised" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PersonalDetails />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileStatus />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LifetimeGoal />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PlanDetails />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Payments />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Transactions />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <PensionAggregate />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Chats />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <Referrals />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <ComplaintsRaised />
      </TabPanel>
    </Box>
  );
};

export default CustomerDetails;
