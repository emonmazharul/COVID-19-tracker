import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app' 
import './public/css/bootstrap.min.css'
import './public/css/style.css'


const root = document.getElementById('container');
root ? ReactDOM.render(<App/>, root) : false; 
