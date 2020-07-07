const fs = require('fs');
// const mongoose = require('mongoose');
// const app = require('../app');
const mongoose = require('mongoose');
const User = require('../model/userModel');
const {
	postUser,
	getUser,
	login,
	logout,
	postSale,
	deleteSale,
	postAvatar,
	getAvatar,
	deleteUser } = require('../router//apiFunctions')

beforeAll((done) => {
	mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:true,
    useUnifiedTopology: true
	})
	.then(() => done())
	.catch(e => done(e));
});

afterAll((done) => {
	mongoose.disconnect()
		.then(() => done())
		.catch(e =>done(e));
})

describe('testing with postive responses', () => {
	const filebuffer = fs.readFileSync('./test/assets/4776.jpg');

	function mockResponse(){
	const res = {};
	res.status = jest.fn().mockReturnValue(res)
	res.send = jest.fn().mockReturnValue(res);
	res.set = ((content,type) => `${content}= ${type}`);
	return res;
}

function mockRequest(id,callback) {
	return {
		session:{
			user_id:id,
		},
		file:{
			buffer:filebuffer,
			mimetype:'image/jpg',
		},
		body:{
			email:'emon14@gmail.com',
			password:'124345678',
			name:'emon14',
			id:'5f0192575e2ec718c83e7cb7',
			shopName:'shopone',
			saleYear:'2020',
			saleNote:'bal amar',
			shopIncomes:[
				{monthName:'January', income:456},
				{monthName:'Frebuary', income:345},
			]
		},
	}
}

	// post a user with 201
	test('should create a user with 201', async () => {
		const req = mockRequest();
		const res = mockResponse();
		await postUser(req,res);
		expect(res.status).toHaveBeenCalledWith(201)
	})
	get the user.
	test('should get user with 200', async () => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await getUser(req,res);
		expect(res.status).toHaveBeenCalledWith(200);

	})
	// login the user
	test('should login user with 201', async () => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await login(req,res);
		expect(res.status).toHaveBeenCalledWith(201);
	})
	
 	// post a sale 
	test('should post sale with 201' ,async() => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await postSale(req,res);
		expect(res.status).toHaveBeenCalledWith(201);
	})
 	// should delete a sale with 200
	test('should delete sale with 200' ,async() => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await deleteSale(req,res);
		expect(res.status).toHaveBeenCalledWith(200);
	})
 	// should post avatar with 201
	test('should post avatar with 201' ,async() => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await postAvatar(req,res);
		expect(res.status).toHaveBeenCalledWith(201);
	})
 	// should get avatar with 200
	test('should get avatar with 200' ,async () => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await getAvatar(req,res);
		expect(res.status).toHaveBeenCalledWith(200);
	})
 	// post a user with 201
	test('should delete a user with 200', async () => {
		const req = mockRequest('5f01916846a96818c8c63ef0');
		const res = mockResponse();
		await deleteUser(req,res);
		expect(res.status).toHaveBeenCalledWith(200)
	})


})


describe('testing error responsees', () => {

	function mockResponse(){
	const res = {};
	res.status = jest.fn().mockReturnValue(res)
	res.send = jest.fn().mockReturnValue(res);
	res.set = ((content,type) => `${content}= ${type}`);
	return res;
}

function mockRequest(id) {
	return {
		session:{
			user_id:id,
		},
		body:{
			email:'emon3@gmail.com',
			password:'24345678',
			id:undefined,
			shopName:'shopone',
			saleYear:'2020',
	}
}
	//failed to create user
	test('should failed to create a user with 400', async () => {
		const req = mockRequest();
		const res = mockResponse();
		await postUser(req,res);
		expect(res.status).toHaveBeenCalledWith(400)
	})
	//failed to get user
	test('should failed to get a user with 401', async () => {
		const req = mockRequest();
		const res = mockResponse();
		await getUser(req,res);
		expect(res.status).toHaveBeenCalledWith(401)
	})
	//failed to login
	test('should failed to login a user with 400', async () => {
		const req = mockRequest();
		const res = mockResponse();
		await login(req,res);
		expect(res.status).toHaveBeenCalledWith(400)
	})
	//should failed to create a sale
	test('should failed to create a sale with 400', async () => {
		const req = mockRequest();
		const res = mockResponse();
		await postSale(req,res);
		expect(res.status).toHaveBeenCalledWith(400)
	})
	//should failed to delete sale
	test('should failed to delete a sale with 400', async () => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await deleteSale(req,res);
		expect(res.status).toHaveBeenCalledWith(400)
	})
	//should failed to post a avatar
	test('should failed to post  a avatar with 401', async () => {
		const req = mockRequest('5f00be6ec85db803a853379f');
		const res = mockResponse();
		await postAvatar(req,res);
		expect(res.status).toHaveBeenCalledWith(401)
	})

	//should fialed to get avatar
	test('should failed to get a avatar with 401', async () => {
		const req = mockRequest();
		const res = mockResponse();
		await getAvatar(req,res);
		expect(res.status).toHaveBeenCalledWith(401)
	})
	//shuld failed to user account
	test('should failed to delete user account with 401', async () => {
		const req = mockRequest('5f01915401025c18c8783079');
		const res = mockResponse();
		await deleteUser(req,res);
		expect(res.status).toHaveBeenCalledWith(401)
	})

})