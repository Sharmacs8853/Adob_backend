import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
// CREATE USERS
export const createUser = async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        console.log(name, email, bio);
        const existing_user = await User.findOne({ email });
        if (existing_user) {
            res.send({ mag: "user already exist" });
        } else {
            const new_user = new User({
                name,
                email,
                password,
                bio,
            })
            await new_user.save();
            res.send({ mag: "User addes successfull" })
        }
    } catch (error) {
        res.status(401).send({ msg: "signup failed" });
        console.log('err', error);
    }
}
// GET USER
export const getUser = async (req, res) => {
    try {
        const query = req.query;
        const users = await User.find(query);
        res.status(200).send(users)
    } catch (error) {
        res.send({ msg: "something wend wrong" })
        console.log('error', error)
    }
}

//GET USER BY ID
export const getUserbyId = async (req, res) => {
    const user_id = req.params.id;
    try {
        const one_user = await User.findOne({ _id: user_id });
        res.send(one_user);
    } catch (error) {
        res.send({ "msg": "someting went wrong" });
    }
}

//UPDATE USER
export const updateUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
            new: true
        })
        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(404).send({ "msg": "you can't be updated something went wrong" })
    }
}

//DELETE USER
export const deleteUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        await User.deleteOne({ _id: user_id })
        res.send({ "msg": "user deleted successfully" })
    } catch (error) {
        res.send({ msg: "user  deleted failed something wend wrong" })
    }
}

//USER LOGIN
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne(({ email }));
        if (user) {
            const stored_password = user.password;
            const user_id = user._id;
            if (password === stored_password) {
                const token = jwt.sign({ user_id }, 'jitendraKey');
                res.send({ msg: "Login successfull", token, user })
            } else {
                res.send({ msg: "Login failed" })
            }
        }
    } catch (error) {
        res.send({ "msg": "something went wrong with login" })
    }
}