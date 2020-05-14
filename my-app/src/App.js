import React,{useReducer} from 'react'
import {Container,Col,Row, ListGroup,Button, ListGroupItem } from 'reactstrap';
import {Transition} from 'react-transition-group';
import DragAndDrop from './drag'
import './App.css'

const initalState = {
	dropDepth:0,
	inDropZone:false,
	fileList:[],
}

function reducer(state,action){
	switch(action.type){
		case 'SET_DROP_DEPTH':
			return {...state,inDropZone:action.inDropZone};
		case 'SET_IN_DROP_ZONE':
			return {...state,inDropZone:action.inDropZone};
		case 'ADD_FILE_TO_LIST':
			return {...state,fileList: state.fileList.concat(action.file)};
		default :
			return state;			
	}
}
function App(){
	const [data,dispatch] = useReducer(reducer,initalState);
	return (
		<div className="App">
			<h1>React drag and drop Component</h1>
			<DragAndDrop data={data} dispatch={dispatch}/>
			<ol className="dropped-files">
				{ data.fileList.map(f => {
					return <li key={f.name}>{f.name}</li>
					
				    })	
				} 
			</ol>
		</div>
	)
}





// const defaultStyle = {
//   transition: `all 10s ease`,
//   opacity: 1
// };
// const transitionStyles = {
//   // entering: { transform: 'scale(0.5)', opacity: 0 }, 
//   // entered: { transform: 'scale(2.0)', opacity: 1},
//   // exiting: { opacity: 0 },
//   // exited: { opacity: 0 }
//   entering:{color:'red',opacity:0},
//   entered:{color:'blue',opacity:1},
//   exiting:{opacity:0},
//   exited:{display:'none'},
// };

// function App(props){
//     const [entered,setEntered] = useState(false);
//     return (
//         <div>
//             <button onClick={() => setEntered(!entered)}>transiton </button>
//             <Transition in={entered} 
//                 timeout={{
//                     app:100,
//                     enter:300,
//                     exit:300,
//                 }} 
//                 appear
//                 unmountOnExitW>
//                 {state => (
//                     <div style={{...defaultStyle,...transitionStyles[state]} }> I am {state}</div>
//                 )}
//             </Transition>
//         </div>
//     )
// }

// function App(){
//     const [isToogle,changeToggle] = useState(true);
//     const toggler = () => {
//         changeToggle(!isToogle);
//     }
//     return (
//         <Container className="mt-3">
//             <Row>
//                 <Col>
//                     <Button onClick={toggler} color="primary">Toggle</Button>
//                 </Col>
//                <CSSTransition in={isToogle} timeout={350} unmountOnExit>
//                     <Col md="6">
//                     <ListGroup>
//                       <ListGroupItem>Cras justo odio</ListGroupItem>
//                       <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
//                       <ListGroupItem>Morbi leo risus</ListGroupItem>
//                       <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
//                       <ListGroupItem>Vestibulum at eros</ListGroupItem>
//                     </ListGroup>
//                     </Col>
//                </CSSTransition>
//             </Row>
//         </Container>
//     )
// }

export default App;