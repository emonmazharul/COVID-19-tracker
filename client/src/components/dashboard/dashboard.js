import React, { useState, useContext } from 'react';
import {
  Grid, Container,
} from 'semantic-ui-react';
import { Datacontext, ContextComponent } from '../context/context';
import SaleCard from './SaleCard';
import SaleChart from './SaleChart';
import Nav from './dashboardMenu';
import Setting from './setting';
import SaleNote from './SaleNote';
function Child() {
  const [showSetting, changeState] = useState(false);
  const {sale_for_chart:note} = useContext(Datacontext).userData;
  return (
    <React.Fragment>
    <Nav
      settingViewer={() => changeState(true)}
      saleViewer={() => changeState(false)}
      active={showSetting}
    />
    <Container>
      <Grid stackable>
        {!showSetting && (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={14}>
              <SaleChart />
              {note && note.saleNote && <SaleNote note={note} />}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <SaleCard />
          </Grid.Row>
        </React.Fragment>
        )}
      </Grid>
      {showSetting && <Setting />}
    </Container>
    </React.Fragment>
  );
}

function Dashboard() {
  return (
    <ContextComponent>
      <Child />
    </ContextComponent>
  );
}

export default Dashboard;

