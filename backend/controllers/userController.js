import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import generateJwtToken from '../utils/generateJwtToken.js';
import mongoose from 'mongoose';

const userController = {
    authUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        console.log("🚀 ~ file: userController.js:9 ~ authUser:asyncHandler ~ user:", user)

        if (user && (await user.matchPassword(password))) {
            generateJwtToken(res, user._id)

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            })
        } else {
            res.status(400)
            throw new Error('Invalid email or password')
        }

    }),
    registerUser: asyncHandler(async (req, res) => {
        const { name, email, password } = req.body
        const isUserExists = await userModel.findOne({ email })

        if (isUserExists) {
            res.status(400)
            throw new Error('Email already Exist')
        }

        const user = await userModel.create({
            name,
            email,
            password,
        })

        if (user) {
            generateJwtToken(res, user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }),
    logOutUser: (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        })
        res.status(200).json({ msg: 'Logged out succesfully' })
    },
    getUserProfile: (req, res) => {
        const user = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email
        }
        res.status(200).json(user)
    },
    updateUser: asyncHandler(async (req, res) => {
        const user = await userModel.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save()
            res.status(201).json(updatedUser)
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }),
    updateProfileImage: asyncHandler(async (req, res) => {
        const { _id, imageUrl } = req.body
        console.log("🚀 ~ file: userController.js:88 ~ updateProfileImage:asyncHandler ~ _id, imageUrl:", _id, imageUrl)
        const objectId = new mongoose.Types.ObjectId(_id);
        try {
            const imageUpdated = await userModel.findOneAndUpdate({ _id: _id }, { image: imageUrl }, { new: true })
            res.status(201).json(imageUpdated)
        } catch (error) {
            throw new Error('Error updating profile');
        }
    })
}

export default userController