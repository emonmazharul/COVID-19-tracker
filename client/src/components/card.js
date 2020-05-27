import React,{useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Product(props){
	return (
		<React.Fragment>
		{
			props.products.map(product => (
				<Card key={product.itemID}>
				<Card.Img varient="top" src={product.img} />
				<Card.Body>
					<Card.Title>{product.itemName}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Quantity:{product.quantity}</Card.Subtitle>
					<Card.Text>
						${product.price}
					</Card.Text>
					<Button data-id={product.itemID} onClick={props.setCart}>
						Add to cart
					</Button>
				</Card.Body>
				</Card>
			))
		}
		</React.Fragment>
	);
}



export default Product;