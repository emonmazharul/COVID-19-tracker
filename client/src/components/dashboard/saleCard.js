import React, { useEffect, useContext } from 'react';
import {
  Grid, Card, Button,
} from 'semantic-ui-react';
import { Datacontext } from '../context/context';

function SaleCard() {
  const myContext = useContext(Datacontext);
  const { userData: { sales }, handlers: { changeSaleChart, saleDeleter } } = myContext;

  useEffect(() => {
    'calling use effect for updating sale dashboard';
  }, [sales]);
  return (
    <React.Fragment>
      {
				sales
				&& sales.map((sale) => (
  <Grid.Column key={`${sale._id}clone`} mobile={8} tablet={5} computer={5}>
    <Card
      style={{ marginBottom: '1em' }}
      data-meaw={sale._id}
    >
      <Card.Content>
        <Card.Header>{sale.shopName}</Card.Header>
        <Card.Meta>
          Year:
          {sale.saleYear}
        </Card.Meta>
        <Card.Description>
          <strong>
            Total income:
            {sale.totalIncome}
          </strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
       <div className='ui two buttons'>
          <Button
            basic
            color="blue"
            data-key={sale._id}
            onClick={changeSaleChart}
          >
            Show Chart
          </Button>
          <Button
            basic
            color="red"
            data-key={sale._id}
            onClick={saleDeleter}
          >
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Grid.Column>
    		))
			}
    </React.Fragment>
  );
}

export default SaleCard;
