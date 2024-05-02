import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String 
  },
  termsAccepted: {
    type: Boolean,
    required: true
  },
  is_verified:{
    type:Boolean,
    default:false
},
}, { timestamps: true });

export default mongoose.model("User",userSchema);
