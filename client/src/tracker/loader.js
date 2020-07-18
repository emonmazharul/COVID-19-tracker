import React from "react";
import { Spinner, Flex, Heading, Box } from "@chakra-ui/core";

function Loader({ loadingMsg }) {
  return (
    <Flex justify="center" align="center" w="100%" h="100vh">
      <Box>
        {!loadingMsg && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {loadingMsg && <Heading color="red.500">{loadingMsg}</Heading>}
      </Box>
    </Flex>
  );
}

export default Loader;
