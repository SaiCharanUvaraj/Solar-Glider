import mongoose from "mongoose";

const AccountsSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
      },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String
    }
});

export const AccountsModel = mongoose.model("Accounts", AccountsSchema);