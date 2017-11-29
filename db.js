var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sense');
 
var senseSchema = new mongoose.Schema({
    tempC: Number,
    umidity: Number,
    light: Number
}, { collection: 'sense' }
);
 
module.exports = { Mongoose: mongoose, SenseSchema: senseSchema }