import React, { useContext } from "react";
import { PoolContext } from "./context";
import { Header, Container, Segment } from "semantic-ui-react";
function PoolQuestion() {
  const { poolQuestion } = useContext(PoolContext).poolData;
  return (
    <Container>
      <Segment vertical>
        <Header as="h3" content={poolQuestion} />
      </Segment>
    </Container>
  );
}

export default PoolQuestion;
