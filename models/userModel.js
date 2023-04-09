import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, min: 4, max: 50 },
        email: { type: String, required: true, min: 4, max: 50 },
        password: { type: String, required: true, min: 4, max: 50 },
        bio: { type: String, required: true, min: 6, max: 150 },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);

export default User
