import React,{useState,useRef} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function Cart(props){
	const [totalPrice,setTotalPrice] = useState(0);
	const [msg,setMsg] = useState('');
	const inpRef= useRef();
	
	function makeOrder() {
		const totalItems = Number(inpRef.current.value);
		const grandTotal = totalItems*props.data.price;
		const user = {
			userName:'John Doe',
			userOccupation:'Farmer',
			userAddress:'John Doe Street,House 12,Dhaka'
		};
		const body = {
			...user,
			itemName:props.data.itemName,
			quantity:props.data.quantity,
			img:props.data.img,
			itemPrice:props.data.price,
			orderdItem:Number(inpRef.current.value),
			itemID:props.data.itemID,
			totalPrice,
		}
		axios.post('http://localhost:5000/order' , body)
		.then(({data}) => {
			setMsg(data)
			setInterval(() => {
				setMsg('')
			}, 3000)
		})
		.catch(e => {
			console.log(e);
			setMsg(e.response.data)
		})
	}

	function priceCounter(){
		const totalItems = Number(inpRef.current.value);
		setTotalPrice(totalItems*props.data.price)
	}
	 
	function getAll(){
		if(props.data.itemName&&props.data.price&&props.data.img){
			return true;
		}
		return false;
	}
	return (
		<React.Fragment>
		<h4 style={{textAlign:'center'}}>Add Product</h4>
		{ getAll() ? 
			<Card>
				<Card.Img varient="top" src={props.data.img}></Card.Img>
				<Card.Body>
					<Card.Title>{props.data.itemName}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">{props.data.quantity}</Card.Subtitle>
					<Card.Text>Price: ${props.data.price}</Card.Text>
					<Form.Label>Number of item</Form.Label>
					<Form.Control onChange={priceCounter} ref={inpRef} type="number" name="number" placeholder="1"></Form.Control>
					<Card.Text className="mt-2">{msg}</Card.Text>
				</Card.Body>
			</Card> :
			<p style={{marginLeft:'15px'}}>Add a item</p>
		}
		<div style={{position:'absolute',bottom:'0',marginLeft:'15px', marginBottom:'5px'}}>

			<Button disabled={getAll() ? false : true} onClick={makeOrder} varient="primary">Place order</Button>
			<span style={{display:getAll() ? '' : 'none'}}> Grand Price: ${totalPrice||props.data.price}</span>

		</div>
		</React.Fragment>
	);
}

export default Cart;