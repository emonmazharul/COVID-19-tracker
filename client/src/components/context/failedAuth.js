import React from 'react'
import { Header, Button ,Grid } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
function FailedAuth(){
	return (
		<Grid centered style={{minHeight:'100vh'}} verticalAlign="middle">
			<Grid.Row centered >
				<Grid.Column computer={6} mobile={16} tablet={10}>
					<Header as="h1" color="red">You aren't authenticated</Header>
					<Button as={Link} to="/register" content="Register" />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}

export default FailedAuth;