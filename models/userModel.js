const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    addr: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    is_admin: {
        type: Boolean
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
})


//middlewares

//check passwords match
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//encrypt password before save
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports.User = model("User", userSchema);

