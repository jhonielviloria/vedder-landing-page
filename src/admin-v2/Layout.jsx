import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import MessageIcon from '@mui/icons-material/Message';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../admin/AdminContext';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAdmin();

  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  const links = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin', exact: true },
    { text: 'Products', icon: <InventoryIcon />, path: '/admin/products' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
    { text: 'Messages', icon: <MessageIcon />, path: '/admin/messages' },
    { text: 'Orders', icon: <ReceiptIcon />, path: '/admin/orders' },
  ];

  const isActiveLink = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ ...(open && { display: 'none' }), mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Typography variant="body2" color="inherit">
            {new Date().toLocaleString()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map(({ text, icon, path, exact }) => {
            const isActive = isActiveLink(path, exact);
            return (
              <ListItem 
                button 
                key={text} 
                component={NavLink}
                to={path}
                sx={{ 
                  pl: open ? 2 : 1,
                  backgroundColor: isActive ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                  color: isActive ? '#1976d2' : 'inherit',
                  '&:hover': {
                    backgroundColor: isActive ? 'rgba(25, 118, 210, 0.18)' : 'rgba(0, 0, 0, 0.04)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: isActive ? '#1976d2' : 'inherit',
                  }
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <ListItem button onClick={() => { logout(); navigate('/admin/login'); }}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItem>
      </Drawer>
      <main style={{ flexGrow: 1, padding: theme.spacing(3), marginTop: theme.mixins.toolbar.minHeight }}>
        <DrawerHeader />
        {children}
      </main>
    </div>
  );
}