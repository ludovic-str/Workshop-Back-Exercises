import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// api
import { getMyUserInfos } from '../../api/auth';
//
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyInfos = async () => {
      const data = await getMyUserInfos(localStorage.getItem('token'));

      if (data === null) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }
      setUser(data);
    };
    fetchMyInfos();
  }, [navigate]);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} userInfos={user} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} userInfos={user} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
