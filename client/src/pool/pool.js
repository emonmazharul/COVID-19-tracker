import React from "react";
import PoolChart from "./poolChart";
import PoolResult from "./poolResult";
import VoterForm from "./voterForm";
import { PoolInfo } from "./infoMessage";
import PoolQuestion from "./poolQuestion";
import { PoolContextProvider } from "./context";

function PoolChild() {
  return (
    <React.Fragment>
      <PoolInfo />
      <PoolQuestion />
      <PoolChart />
      <PoolResult />
      <VoterForm />
    </React.Fragment>
  );
}

function Pool() {
  return (
    <PoolContextProvider>
      <PoolChild />
    </PoolContextProvider>
  );
}

export default Pool;
