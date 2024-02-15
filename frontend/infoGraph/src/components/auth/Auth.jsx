/* eslint-disable react/prop-types */
import { When } from 'react-if';
import { LoginContext } from '../context/LoginProvider';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = (props) => {
  const { loggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to login if not logged in
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return <When condition={loggedIn}>{props.children}</When>;
};

export default Auth;
