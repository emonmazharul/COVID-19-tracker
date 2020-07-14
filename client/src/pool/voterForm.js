import React,{ useState, useContext } from 'react'
import {Form,Container,Button} from 'semantic-ui-react'
import {SuccessMessage,ErrorMessage} from './infoMessage';
import { PoolContext } from './context'


function VoterForm() {
	const [myOption,setOption] = useState('');
	const { poolData,handler:{giveVote},responseMsg, buttonLoading } = useContext(PoolContext);
	const { poolOptions, poolEnded } = poolData;
	function selectMyOption(e,{value}) {
			setOption(value);
	}
	function handler(e){
		e.preventDefault();
		const voterEmail = e.target.elements.email.value;
		const chooseOption = myOption;
		giveVote({chooseOption,voterEmail});
		e.target.reset();
	}
	return(
			<Container style={{marginBottom:'1em'}}>
				<Form onSubmit={handler}>
				{ responseMsg.success && <SuccessMessage msg={responseMsg.success}/> }
				{	responseMsg.error && <ErrorMessage msg={responseMsg.error}/> }
				<Form.Group style={{marginBottom:'1em'}}>
					{
						poolOptions.map(option => (
							<Form.Radio
								key={option._id}
								label={option.optionName}
								value={option.optionName}
								onChange={selectMyOption}
								checked={myOption===option.optionName}
							/>
						))
					}
					</Form.Group>
					<Form.Input
						style={{maxWidth:'360px'}}
						type="email"
						label="Voter Email"
						name="email"
						required
					/>
					<Button
						type="submit"
						color="teal"
						content="Vote"
						disabled={poolEnded ? true : false || !myOption ? true : false}
						loading={buttonLoading}
					/>
				</Form>
			</Container>
	);
}

export default VoterForm;