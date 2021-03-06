const collections = require("./collections");
const users = collections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require ("bcrypt");

async function getAll() {
	const usCollection = await users();
	const uss = await usCollection.find({}).toArray();
	return uss;}

async function get(id) {
  	if (!id) {throw "You must provide an id to search for";}
  	const userCollection = await users();
  	const user = await userCollection.findOne({ _id: ObjectId(id)});
  	if (user === null) {return false;}
	return user;}

async function create(name,password){
  	let user = {
		hashPass: bcrypt.hashSync(password,16),
		status: "Standard User",
		profile:{
			username: name,
			favChar: "-"}};
  	const userCollection=await users();
  	const insertInfo = await userCollection.insertOne(user);
  	const newId = insertInfo.insertedId;
  	const us = await get(newId);
  	return us;}

async function changepass(id, newpass) {
	let newhash=bcrypt.hashSync(newpass,16);
  	const userCollection = await users();
  	const updatedInfo = await userCollection.updateOne({ _id: ObjectId(id)},
		{$set: {hashPass: newhash}});}

async function changefav(id, newfav) {
  	const userCollection = await users();
  	const updatedInfo = await userCollection.updateOne({ _id: ObjectId(id)},
		{$set: {"profile.favChar": newfav}});}

module.exports = {
    firstName: "Chris",
    lastName: "Paldino",
    studentId: "10412928",
    getAll,
    get,
    create,
	changepass,
	changefav};
