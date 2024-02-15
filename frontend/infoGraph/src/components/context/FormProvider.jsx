/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import cookie from 'react-cookies';
import { LoginContext } from './LoginProvider';

export const FormContext = React.createContext();
const FormProvider = (props) => {
  const loginState = useContext(LoginContext);
  const [submitError, setSubmitError] = useState(false);
  const [show1stForm, setShow1stForm] = useState(true);
  const [show2ndForm, setShow2ndForm] = useState(false);
  const [show3rdForm, setShow3rdForm] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [restId, setRestId] = useState(null);

  const handleBasicInfo = async (info) => {
    const basicInfo = {
      name: info.name,
      phone_num: info.phone,
      street: info.street,
      open_hours: info.openFrom + ' - ' + info.openTo,
      nearby_landmarks: info.nearby.split(','),
      user_id: loginState.user.id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/restaurant`,
        basicInfo,
        {
          headers: {
            Authorization: `Bearer ${cookie.load('auth')}`,
          },
        }
      );

      if (response.data) {
        try {
          getMenuItems();
          setShow1stForm(false);
          setShow2ndForm(true);
          setRestId(response.data.id);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      setSubmitError(true);
    }
  };

  const addMenuItems = async (items) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/restaurant-menu-items`,
        items,
        {
          headers: {
            Authorization: `Bearer ${cookie.load('auth')}`,
          },
        }
      );

      if (response.data) {
        try {
          setShow1stForm(false);
          setShow2ndForm(false);
          setShow3rdForm(true);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const maintananceInfo = async (info) => {
    const dateStrings = info.date.map((date) => new Date(date).toString());
    const joinedDateStrings = dateStrings.join(', ');

    const maintainanceInfo = {
      ...info,
      price: parseInt(info.price),
      date: joinedDateStrings,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/restaurant/maintenance`,
        maintainanceInfo,
        {
          headers: {
            Authorization: `Bearer ${cookie.load('auth')}`,
          },
        }
      );

      if (response.data) {
        try {
          setShow1stForm(false);
          setShow2ndForm(false);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const state = {
    handleBasicInfo,
    submitError,
    show3rdForm,
    show2ndForm,
    show1stForm,
    menuItems,
    addMenuItems,
    maintananceInfo,
    restId,
  };

  const getMenuItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/restaurant/menu-items`,
        {
          headers: {
            Authorization: `Bearer ${cookie.load('auth')}`,
          },
        }
      );
      if (response.data) {
        try {
          console.log(response.data);
          setMenuItems(response.data);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <FormContext.Provider value={state}>{props.children}</FormContext.Provider>
  );
};

export default FormProvider;
