import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        user_id: { type: String, required: true },
        content: { type: String, required: true, min: 4, max: 200 },
        likes: { type: Map, of: Boolean },
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema);
export default Post
