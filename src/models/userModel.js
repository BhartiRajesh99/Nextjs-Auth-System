import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is Required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;