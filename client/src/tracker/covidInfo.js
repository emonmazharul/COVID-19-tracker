import React, { useContext } from "react";
import { Heading, Input, Box, Avatar, Text, Flex } from "@chakra-ui/core";
import { DataContext } from "./context";

function CovidInfo() {
  const {
    latestData,
    handlers: { countryFinder },
  } = useContext(DataContext);
  return (
    <Box h="100vh" width={["24.5%", "100%", "24.5%", "24.5%"]}>
      <Heading as="h4" size="lg" mb="2">
        COID-19 Latest Data
      </Heading>
      <Input
        mb="2"
        border="2px"
        borderRadius="md"
        borderColor="blue.500"
        placeholder="Search"
        onChange={countryFinder}
      />
      <Box overflow="auto" h="87%">
        {latestData.map((item, index) => (
          <Box
            id={item.name}
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
                name={(index + 1).toString()}
                src={`https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/${item.code.toLowerCase()}.svg`}
              />
            </Flex>

            <Text fontSize="xl" fontWeight="bold" color="gray.900">
              {index + 1}. {item.name}
            </Text>

            <Text>
              Total cases : <b style={{ color: "#4299e1" }}> {item.latest_data.confirmed} </b>
            </Text>

            <Text>
              Today cases : <b style={{ color: "#4299e1" }}>{item.today.confirmed} </b>
            </Text>

            <Text>
              Total deaths : <b style={{ color: "#e53e3e" }}>{item.latest_data.deaths} </b>
            </Text>

            <Text>
              Today deaths : <b style={{ color: "#e53e3e" }}> {item.today.deaths} </b>
            </Text>

            <Text>
              Total recovered :
              <b style={{ color: "#48bb78" }}>{item.latest_data.recovered}</b>
            </Text>

            <Text mb="3">
              <b style={{ color: "#086F83" }}>
                Last update : {new Date(item.updated_at).toLocaleString()}
              </b>
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CovidInfo;
