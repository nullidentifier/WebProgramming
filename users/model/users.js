const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;

const USERS ='userdb';

function Users(db) {
this.db = db;
this.users=db.collection(USERS);
}

Users.prototype.getUser = function(id) {
//	console.log(`item: ${JSON.stringify(id)}`);
	const searchSpec = {"_id": id};
	return this.users.find(searchSpec).toArray().
	then(function(users){
	return new Promise(function(resolve,reject){
	if(users.length === 1){
	resolve(users[0]);
	}
	else{
	reject(new Error(`cannot find user ${JSON.stringify(id)}`));
	}
	});
});
}


Users.prototype.findUser = function(id) {
	return this.users.find(id).toArray();



}

/*
Users.prototype.finds = function(query) {
  const searchSpec = { $text: { $search: query } };
  return this.users.find(searchSpec).toArray();
}

*/

Users.prototype.deleteUser = function(id) {
//	console.log(`id: ${JSON.stringify(id)}`);
	const searchSpec = {"_id": id};
	return this.users.deleteOne(searchSpec).
	then(function(results) {
	return new Promise(function(resolve, reject) {
	if (results.deletedCount === 1) {
	resolve();
	}
	else{
	reject(new Error(`cannot delete user ${id}`));
	}
});
});
}




Users.prototype.addUser = function(values,id)
{
	//const 
	return this.users.insertOne({"_id":id,values}).
	then(function(results) {
	return new Promise((resolve) => resolve(results.insertedID));
	});
}




Users.prototype.updateUser = function(values,id){
	// let userrec = this.users.find(user).toArray();
	//if(userrec === 1){
	//const userSpec = { _id: ObjectID(id)};
	//console.log(`spec: ${JSON.stringify(userSpec)}`);
	const searchSpec = { "_id":id};
	return this.users.updateOne(searchSpec,{$set:{values:values}}).
	then(function(result){
	return new Promise(function(resolve, reject){
	if(result.modifiedCount != 1){
	reject(new Error(`updated ${result.modifiedCount} users`));
	}
	else{
	resolve();
	}
	});
	});

}


module.exports = {
Users: Users
};



