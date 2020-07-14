import React,{useState} from 'react'
import {Form,Segment,Button} from 'semantic-ui-react'
import axios from 'axios';
import { SuccessMessage,ErrorMessage } from './infoMessage'
import PoolLink from './poolLink'

const poolOptions = [
	{name:'Option 1',key:'1'},
	{name:'Option 2',key:'2'},
	{name:'Option 3',key:'3'},
	{name:'Option 4',key:'4'},
	{name:'Option 5',key:'5'},
	{name:'Option 6',key:'6'},
]

function CreatePool(){
	const [howManyOption,setOption] = useState([]);
	const [expireAt,setExpireAt] = useState(undefined);
	const [msg,setMsg] = useState({});
	const [buttonLoading,changeState] = useState(false);
	const [poolLink,setPoolLink] = useState(undefined);

	function handler(e){
		e.preventDefault();
		let poolOptions = []
		const creatorName = e.target.elements.creatorName.value;
		const creatorEmail = e.target.elements.creatorEmail.value;
		const poolQuestion = e.target.elements.poolQuestion.value;
		const length = e.target.elements.length-1
		for(let i=0;i<length;i++){
			if(e.target.elements[i].name.includes('Option')){
				poolOptions.push({optionName:e.target.elements[i].value})
			}
		}
		changeState(true);
		axios.post('/pool', {
			creatorName,
			creatorEmail,
			poolQuestion,
			poolOptions,
			expireAt,
		}).
		then(({status,data}) => {
			if(status === 201) {
				const {success,link} = data;
				setMsg({
					...msg,
					success:{header:'Congratulation!!', msg:success,},
					error:undefined,
				})
				setPoolLink(link)
				changeState(false)
			}
		})
		.catch(e => {
			const {data:{error}} = e.response;
			setMsg({
				...msg,
				success:undefined,
				error:{header:'Failed!!', msg:error}
			})
			setPoolLink(undefined)
			changeState(false);
		})
	}

	function optionSetter(e, { value }){
		const index = poolOptions.findIndex((option) => option.key === value);
		const choosedOptions = poolOptions.slice(0,index+1)
		setOption([...choosedOptions])
	}
	const {success,error} = msg;
	return (
		<Segment attached>
			<p>
				Online pool creator helps you create various online pool in a minute.
				Just fill the form below and create your desire pool.
			</p>
			{ success && <SuccessMessage msg={success}/> }
			{ error && <ErrorMessage msg={error}/> }
			{poolLink && <PoolLink link={poolLink}/> }
			<Form onSubmit={handler}>
				<Form.Input
					label="Creator Name"
					type="text"
					name="creatorName"
					required
				/>
				<Form.Input
					label="Creator Email"
					type="email"
					name="creatorEmail"
					required
				/>
				<Form.Input
					style={{color:'white'}}
					label="Pool Question"
					type="text"
					name="poolQuestion"
					required
				/>
				<Form.Select
					label="options"
					placeholder="Choose Option"
					options={[
						{key:'2',text:'2',value:'2'},
						{key:'3',text:'3',value:'3'},
						{key:'4',text:'4',value:'4'},
						{key:'5',text:'5',value:'5'},
						{key:'6',text:'6',value:'6'},
					]}
					onChange={optionSetter}
					required
				/>
				{
					howManyOption.map((option) => (
						<Form.Input
							key={option.key}
							label={option.name}
							name={option.name}
							type="text"
							required
						/>	
					))
				}
				<Form.Select
					label="Pool Duration"
					placeholder="Pool Duration"
					required
					options={[
						{key:'24',text:'1 Day',value:24},
						{key:'48',text:'2 Day',value:48},
						{key:'72',text:'3 Day',value:72},
						{key:'96',text:'4 Day', value:96},
						{key:'120',text:'5 Day', value:120},
					]}
					onChange={(e,{value}) => setExpireAt(value)}
				/>
				<Button 
					type="submit" 
					color="teal"
					content="Crete Pool"
					disabled={expireAt && howManyOption.length > 0 ? false : true}
					loading={buttonLoading}
				/>
			</Form>
			</Segment>
	);
}

export default CreatePool;