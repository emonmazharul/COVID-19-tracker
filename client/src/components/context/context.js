import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FailedAuth from './failedAuth';
import Loader from './placeholder';
axios.defaults.withCredentials = true;

export const Datacontext = React.createContext(undefined);

export function ContextComponent(props) {
  const {children} = props;
  const [authenticated, authChecker] = useState(false);
  const [userData, getUserData] = useState({});
  const [errorObj, setError] = useState({ getError: false });
  const [loading, changeState] = useState('Loading...');

  useEffect(() => {
    axios.get('/user')
      .then(({ data, status }) => {
        if (status === 200) {
          const { user: { name, avatar }, sales } = data;
          authChecker(true);
          getUserData({
            ...userData,
            name,
            avatar,
            sales,
            sale_for_chart: sales[0],
          });
          changeState(undefined);
        }
      })
      .catch(({ response }) => {
        const { error } = response.data;
        authChecker(false);
        setError({
          ...errorObj,
          getError: true,
          error,
        });
        changeState(undefined);
      });
  }, []);

  function changeSaleChart(e) {
    const id = e.target.dataset.key;
    const sale_for_chart = userData.sales.find((sale) => sale._id === id);
    getUserData({
      ...userData,
      sale_for_chart,
    });
  }

  function saleDeleter(e) {
    const id = e.target.dataset.key;
    axios.delete('/sale', {
      data: {
        id,
      },
    })
      .then(({ data, status }) => {
        const { _id } = userData.sale_for_chart;
        if (status === 200) {
          const { sales, deletedSaleId } = data;
          getUserData({
            ...userData,
            sales,
            sale_for_chart: _id === deletedSaleId ? sales[0] : userData.sale_for_chart,
          });
        }
      })
      .catch(() => {
        getUserData({
          ...userData,
        });
      });
  }

  function saleAdder(sales) {
    getUserData({
      ...userData,
      sales,
      sale_for_chart: sales[0],
    });
  }

  function addAvatar(avatar) {
    getUserData({
      ...userData,
      avatar,
    });
  }
  return (
    <Datacontext.Provider
      value={{
        authenticated,
        userData,
        errorObj,
        loading,
        handlers: {
          changeSaleChart,
          saleDeleter,
          saleAdder,
          addAvatar,
			  },
      }}
    >
      {authenticated && userData.name && children}
      {errorObj.getError && <FailedAuth />}
      {loading && <Loader/>}
    </Datacontext.Provider>
  );
}
