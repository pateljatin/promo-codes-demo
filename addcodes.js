/*
This script generates a specified number of short, readable promocodes for a specified
pack. It uses the the node library shortid to accomplish the task. 
*/

//argument 3 should be the number of promocodes
//argument 4 should be the pack_id.
//argument 5 should be 1 for unlimited and 0 for limited. (unlimited)
//recall when running the actual script these look like the first through
//third arguments.
if (process.argv.length != 6){
	console.log("usage: nodejs num_codes pack_id unlimited code");
	return;
}

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/hiart');
var Schema = mongoose.Schema;
var shortId = require('shortid');
var num_codes = parseInt(process.argv.slice(2));
var pack_id = parseInt(process.argv.slice(3));
var unlimited = parseInt(process.argv.slice(4));
var promo_code = process.argv.slice(5);

console.log(num_codes);
console.log(pack_id);
console.log(unlimited);
console.log(promo_code);


//promotion type must include the code, the pack it refers to, whether it's been consumed
//whether is can be consumed (unlimited)
//and the universal created_at and updated_at
var promotionSchema = new Schema({
	// _id: Schema.Types.ObjectId, -- the _id will be automatically added so don't worry about it
	code: String,
	consumed: Number,
	pack_id: Number,
	unlimited: Number,
	updated_at: Date,
	created_at: Date
});

function addCode(Promo){
	var curr = new Promo();
	curr.code = promo_code;
	curr.consumed = 0;
	curr.pack_id = pack_id;
	curr.unlimited = unlimited;
	curr.updated_at = new Date();
	curr.created_at = new Date();
	curr.save(function(err) {
      if (err)
      	console.log(err)
    });
}

//add num_codes promotions
var Promo = mongoose.model('mongo_promocodes', promotionSchema);
for (var i = 0; i < num_codes; i++){
	addCode(Promo);
}
