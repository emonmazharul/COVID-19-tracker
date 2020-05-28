import React,{useState,useEffect} from 'react'
import Cart from './cart'
import Product from './card'
import axios from 'axios'

function App(){
	const [products,getProducts] =  useState([]);
	const [cartProduct,setCartProduct] = useState({});
	const [loadingMsg,setLoadingMsg] = useState('Loading...')
	useEffect(() => {
		axios.get('http://localhost:5000/product')
		.then(({data,status}) => {
			status === 200 ? getProducts(data) : setLoadingMsg('No Product available');
		})
		.catch(e => {
			console.log(e);
			setLoadingMsg(e.response.data);
		})
	}, [])

	function getCart(e){
		const id = e.target.dataset.id;
		const myProduct = products.find(product => product.itemID === id);
		myProduct ? setCartProduct(myProduct) : false;
	}
	if(products[0]) {
		return (
			<div className="main">
			<div className="products">
				<Product setCart={getCart} products={products}/>
			</div>
			<div className="cart">
				<Cart data={cartProduct}/>
			</div>		
			</div>
		);
	}
	return <h2>{loadingMsg}</h2>	
}

export default App;