import React, { useContext } from "react";
import { Message, Container } from "semantic-ui-react";
import { PoolContext } from "./context";

export function SuccessMessage({ msg }) {
  return (
    <Message positive compact>
      <Message.Header>{msg.header}</Message.Header>
      <p>{msg.msg}</p>
    </Message>
  );
}

export function ErrorMessage({ msg }) {
  return (
    <Message negative compact>
      <Message.Header>{msg.header}</Message.Header>
      <p>{msg.msg}</p>
    </Message>
  );
}

function Pooltime({ time }) {
  return (
    <Container style={{ marginTop: "1em" }}>
      <Message info compact>
        Voters can vote till {new Date(time).toLocaleString()}
      </Message>
    </Container>
  );
}

function PoolEndNotice({ notice }) {
  return (
    <Container style={{ marginTop: "1em" }}>
      <Message info compact>
        {notice}
      </Message>
    </Container>
  );
}

export function PoolInfo() {
  const { poolEnded, expireAt, message } = useContext(PoolContext).poolData;
  if (!poolEnded) {
    return <Pooltime time={expireAt} />;
  }
  return <PoolEndNotice notice={message} />;
}
