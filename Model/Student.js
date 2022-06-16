require('dotenv').config();
const mongoose = require('mongoose');

const secret = process.env['MONGO_URL'];
console.log('Connecting to MongoDB...');
mongoose.connect(secret, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');

const Schema = mongoose.Schema;
const ParentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
});
const StudentSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    middlename:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:Date,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    parent :{
        type:ParentSchema,
        required:true
    },
    class:{
        type:String,
        enum:['Jss1',
        'Jss2',
        'Jss3',
        'SS1',
        'SS2',
        'SS3'],
        default:'Jss1'
    },
    gender:{
        type:String,
        enum:['Male','Female','Non-binary','Other'],
        default: 'Other'
    }
});

const Student = mongoose.model("Students",StudentSchema);
console.log("Model created");
exports.Student = Student;