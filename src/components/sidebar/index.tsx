import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useLocation } from 'react-router-dom';
import { colorTheme } from 'theme';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

import { type IDrawerLeftItemProps, type IDrawerLeftProps } from 'types';
import { privateRoutes } from '../../routes/Routes';
import MMtext from '../../assets/images/Marshmallow.png';

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  openLogoutModal,
}: IDrawerLeftItemProps): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  return (
    <MenuItem
      active={selected === to}
      style={{
        color: colors.gray[100],
        fontFamily: 'Inter',
        fontWeight: 90,
      }}
      onClick={() => {
        if (title === 'Logout') {
          openLogoutModal();
          return;
        }
        setSelected(title);
      }}
      icon={icon}
    >
      <Typography sx={{ fontFamily: 'Inter', fontWeight: 500 }}>
        {title}
      </Typography>
      <Link to={String(to)} />
    </MenuItem>
  );
};

const DrawerLeft = ({ openLogoutModal }: IDrawerLeftProps): JSX.Element => {
  const theme = useTheme();
  const colors = colorTheme(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const routerName = useLocation();

  useEffect(() => {
    setSelected(routerName.pathname);
  }, [selected]);

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primaryBg[900]} !important`,
          boxShadow: 3,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
          fontFamily: 'Inter !important',
          fontWeight: 500,
          fontSize: 34,

          '& .pro-icon': {
            color: '#898989',
          },
        },
        '& .pro-inner-item: hover': {
          color: '#000000 !important',

          '& .pro-icon': {
            color: '#B5DFC8 !important',
          },
        },
        '& .pro-menu-item.active': {
          backgroundColor: '#B5DFC8 !important',
          color: '#000000 !important',
          borderRadius: '5px',

          width: '95%',
          fontFamily: 'Inter',
          '& .pro-icon': {
            color: '#000000 !important',
          },
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.gray[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="7px"
              >
                <IconButton
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
                <img width="70%" src={MMtext} />
                <Typography variant="h3" color={colors.gray[100]}></Typography>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : '4%'}>
            {privateRoutes.map(({ path, name }, index) => {
              if (name) {
                let icon;
                if (name === 'Home') {
                  icon = <HomeOutlinedIcon />;
                } else if (name === 'Users') {
                  icon = <PeopleOutlinedIcon />;
                } else if (name === 'Customers') {
                  icon = <Diversity3OutlinedIcon />;
                } else if (name === 'Complaints') {
                  icon = <SupportAgentOutlinedIcon />;
                } else if (name === 'Logout') {
                  icon = <LogoutOutlinedIcon />;
                }

                return (
                  <Item
                    key={`${String(index)}-${String(name)}`}
                    title={name}
                    to={path}
                    icon={icon}
                    selected={selected}
                    setSelected={setSelected}
                    openLogoutModal={openLogoutModal}
                  />
                );
              }
              return null;
            })}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default DrawerLeft;
