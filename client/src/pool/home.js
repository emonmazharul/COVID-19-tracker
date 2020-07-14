import React from "react";
import { Grid, Header } from "semantic-ui-react";
import CreatePool from "./createPool";
function Home() {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column
          mobile={16}
          tablet={10}
          computer={10}
          style={{ marginTop: "2em" }}
        >
          <Header as="h2" attached="top">
            Online Pool Creator
          </Header>
          <CreatePool />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
