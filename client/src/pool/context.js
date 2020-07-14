import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./loader";
import NotFound from "./404";

export const PoolContext = React.createContext(undefined);

export function PoolContextProvider(props) {
  const [poolData, setPoolData] = useState({ poolOptions: [], loading: true });
  const [responseMsg, setMsg] = useState({});
  const [buttonLoading, changeState] = useState(false);
  const [notFoundMsg, setNotfoundMsg] = useState("");
  const { id } = useParams();

  const { poolOptions,loading } = poolData;

  useEffect(() => {
    axios
      .get("/pool/" + id)
      .then(({ status, data }) => {
        const { pool, message } = data;
        if (status === 200) {
          setPoolData({
            ...poolData,
            ...pool,
            message,
            loading: false,
          });
        }
      })
      .catch(({ response }) => {
        const { error } = response.data || {
          error: "Poor network connection.Reload again",
        };
        setNotfoundMsg(error);
      });
  }, []);

  function giveVote(data) {
    changeState(true);
    axios
      .patch("/pool/" + id, data)
      .then(({ status, data }) => {
        if (status === 201) {
          setPoolData({
            ...poolData,
            poolOptions: data.poolOptions,
            totalVote: data.totalVote,
          });
          setMsg({
            ...responseMsg,
            error: undefined,
            success: { header: "Congratulation!!", msg: data.success },
          });
          changeState(false);
        }
      })
      .catch(({ response }) => {
        const { error } = response.data || { error: "Poor network connection" };
        setMsg({
          ...responseMsg,
          success: undefined,
          error: { header: "Failed!!", msg: error },
        });
        setTimeout(() => {
          setMsg({
            ...responseMsg,
            success: undefined,
            error: undefined,
          });
        }, 3000);
        changeState(false);
      });
  }

  return (
    <PoolContext.Provider
      value={{
        poolData,
        responseMsg,
        buttonLoading,
        handler: {
          giveVote,
        },
      }}
    >
      <React.Fragment>{!notFoundMsg && loading && <Loader />}</React.Fragment>
      <React.Fragment>
        {notFoundMsg && <NotFound msg={notFoundMsg} />}
      </React.Fragment>
      {poolOptions.length > 0 && props.children}
    </PoolContext.Provider>
  );
}
