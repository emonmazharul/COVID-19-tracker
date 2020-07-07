import React from 'react';
import { Message, Segment } from 'semantic-ui-react';

function MyMessage() {
  return (
    <Segment inverted textAlign="left">
      <Message color="black">
        <Message.Header>Sale Manager</Message.Header>
        <p>
          Sale Manager is an app that help you save your sell of various  organization online.
          It is beautiful and secure and has so many amazing feature.It track your monthly income and
          yearly income.It is easy to us and has some very useful features.
          It also offers you amazing data visualization.
        </p>
      </Message>
    </Segment>
  );
}

export default MyMessage;
