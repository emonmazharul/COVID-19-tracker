import React, { useContext } from "react";
import { Heading, Input, Box, Avatar, Text, Flex } from "@chakra-ui/core";
import { DataContext } from "./context";

function CovidStatic() {
  const {
    statistics,
    handlers: { countryStaticFinder },
  } = useContext(DataContext);
  return (
    <Box
      h="100vh"
      width={["24.5%", "0%", "24.5%", "24.5%"]}
      display={["block", "none", "block", "block"]}
    >
      <Heading as="h4" size="lg" mb="2">
        COID-19 Statistics
      </Heading>
      <Input
        mb="2"
        border="2px"
        borderRadius="md"
        borderColor="blue.500"
        placeholder="Search"
        onChange={countryStaticFinder}
      />
      <Box overflow="auto" height="87%">
        {statistics.map((item, index) => {
          const {
            death_rate,
            recovery_rate,
            recovered_vs_death_ratio,
            cases_per_million_population,
          } = item.latest_data.calculated;
          return (
            <Box
              id={item.name + "_statistics"}
              mb="2"
              pl="2"
              key={item.code}
              border="1px"
              borderRadius="md"
              borderColor="gray.200"
              boxShadow="0px 7px 20px #ddd"
            >
              <Flex justifyContent="center">
                <Avatar
                  mt="3"
                  name={index + 1 + ""}
                  src={`https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/${item.code.toLowerCase()}.svg`}
                />
              </Flex>

              <Text fontSize="xl" fontWeight="bold" color="gray.900">
                {index + 1}. {item.name}
              </Text>

              <Text>
                Recovery reate :
                <b style={{ color: "#48bb78" }}> {recovery_rate} </b>
              </Text>

              <Text>
                Death rate : <b style={{ color: "#e53e3e" }}>{death_rate} </b>
              </Text>

              {recovered_vs_death_ratio && (
                <Text>
                  Recovery VS Death ratio :
                  <b style={{ color: "#4299e1" }}>{recovered_vs_death_ratio}</b>
                </Text>
              )}
              {cases_per_million_population && (
                <Text>
                  Cases per million population :
                  <b style={{ color: "#4299e1" }}>
                    {cases_per_million_population}
                  </b>
                </Text>
              )}
              <Text mb="3">
                <b style={{ color: "#086F83" }}>
                  Last update : {new Date(item.updated_at).toLocaleString()}
                </b>
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default CovidStatic;
