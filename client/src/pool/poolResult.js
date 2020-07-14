import React, { useEffect, useContext } from "react";
import { Card, Container } from "semantic-ui-react";
import { PoolContext } from "./context";

function PoolResult() {
  const { poolOptions: poolResult } = useContext(PoolContext).poolData;
  useEffect(() => {
    "upding pool result when result get changed";
  }, [poolResult]);
  return (
    <Container style={{ marginTop: "1em", marginBottom: "2em" }}>
      <Card.Group>
        {poolResult.map((pool) => (
          <Card
            key={pool._id}
            header={pool.optionName}
            meta={`${pool.vote} vote${pool.vote > 1 ? "s" : ""}`}
          />
        ))}
      </Card.Group>
    </Container>
  );
}

export default PoolResult;
