const mong = require("mongoose");
mong.connect("mongodb+srv://admin:Admin123@cluster0.1hu1yx6.mongodb.net/");

const userSchema = mong.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
    },

    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
});

const accountSchema = mong.Schema({
    userId: {
        type: mong.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const User = mong.model("User", userSchema);

const Account = mong.model("Account", accountSchema);

module.exports = {
    User,
    Account,
};
