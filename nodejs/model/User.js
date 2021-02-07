const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let User = new Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }, 
        name:{ type: String },
        image:{ type: String },
        DOB:{ type: Date },
        education:{ type: String },
        
    }
);

module.exports = mongoose.model("user", User);