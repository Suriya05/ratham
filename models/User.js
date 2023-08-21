import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        universityId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

export default User;