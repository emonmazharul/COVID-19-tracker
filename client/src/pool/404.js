import React from "react";
import { Header, Segment, Message } from "semantic-ui-react";

function NotFound({ msg }) {
  return (
    <React.Fragment>
      <Header attached as="h2" color="red" content="404 Not found" />
      <Segment attached vertical>
        <Message negative compact>
          <p>{msg}</p>
        </Message>
      </Segment>
    </React.Fragment>
  );
}

export default NotFound;
