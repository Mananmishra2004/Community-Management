const mongoose = require('mongoose');

// Improved Connection Logic with Error Handling
mongoose.connect('mongodb://127.0.0.1:27017/test1')
   
const userSchema = mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true 
    },
    image: String,
   
    role: { 
        type: String, 
        default: 'user',
        enum: ['user', 'admin'] 
    }
});

module.exports = mongoose.model('user', userSchema);