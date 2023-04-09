import Post from "../models/postModel.js";

//CREATE POST
export const createPost = async (req, res) => {
    try {
        const { user_id, content } = req.body;

        const new_post = new Post({
            user_id,
            content,
            likes: {}
        })
        await new_post.save();
        res.send({ mag: "post added successfull" })

    } catch (error) {
        res.status(401).send({ msg: "post added failed" })
    }
}

//GET POST
export const getPost = async (req, res) => {
    try {
        const query = req.query;
        const posts = await Post.find(query);
        res.status(200).send(posts)
    } catch (error) {
        res.send({ msg: "something wend wrong" })
    }
}

//UPDATE POST
export const updatePost = async (req, res) => {
    const post_id = req.params.id;
    try {
        const updatedPost = await Post.findByIdAndUpdate(post_id, req.body, {
            new: true
        })
        res.status(200).send(updatedPost)
    } catch (error) {
        res.status(404).send({ "msg": "you can't be updated Post something went wrong" })
    }
}

//GET POST BY ID
export const getPostById = async (req, res) => {
    const post_id = req.params.id;
    try {
        const one_post = await Post.findOne({ _id: post_id });
        res.send(one_post);
    } catch (error) {
        res.send({ "msg": "someting went wrong" });
    }
}

//DELETE POST
export const deletePost = async (req, res) => {
    const post_id = req.params.id;
    try {
        await Post.deleteOne({ _id: post_id })
        res.send({ "msg": "Post deleted successfully" })
    } catch (error) {
        res.send({ msg: "Post  deleted failed something wend wrong" })
    }
}

//LIKE POST

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(user_id);
        if (isLiked) {
            post.likes.delete(user_id);
        } else {
            post.likes.set(user_id, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).send(updatedPost)
    } catch (error) {
        res.status(404).send({ msg: "you can not update the post" })
    }
}