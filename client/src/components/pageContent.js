import React from 'react'
import {Container,Header,Segment,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function PageContent({mobile}){
	return (
			<Segment inverted vertical style={{
					marginTop:0,
					height:'92vh',
					backgroundImage: `radial-gradient(circle, #20211b, #1d1e18, #1a1b16, #161713, #131410)`
				}}>
			<Container text>
				<Header 
					as="h1"
					content="Sales Manager"
					inverted
					style={{
						color:'f6e8ea',
		        fontSize: mobile ? '2em' : '4em',
		        fontWeight: 'normal',
		        marginBottom: 0,
		        marginTop: mobile ? '1.5em' : '3em',
	      	}}
				/>
				<p style={{color:'f6e8ea'}}>
					Sales Manager is a modern React app that helps you to save your sales of various businesses.
					It is modern app and to use it you require an account.It has a amazing dashboard and beautiul visual data representaion.
					To see how the app works login with email <strong>admin@admin.com</strong> , password <strong>12345678</strong>.Please Don't delete any content.
				</p>
				<Button.Group size="big">
					<Button 
						color="teal"
						as={Link} to="/register"
						size="huge"
						labelPosition="right" 
						icon="signup" 
						content="Register"/>
				</Button.Group>
			</Container>
			</Segment>
	);
}

export default PageContent;