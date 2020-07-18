import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Flex } from "@chakra-ui/core";
import { DataComponent } from "./context";
import CovidInfo from "./covidInfo";
import CovidStatic from "./covidStatic";
import CovidMap from "./map";
import customTheme from "./theme";

function AllComponents() {
  return (
    <Flex ml="1" mr="1">
      <DataComponent>
        <CovidInfo />
        <CovidMap />
        <CovidStatic />
      </DataComponent>
    </Flex>
  );
}

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <AllComponents />
    </ThemeProvider>
  );
}

export default App;
