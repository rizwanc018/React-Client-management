import asyncHandler from 'express-async-handler';
import adminModel from '../models/adminModel.js';
import userModel from '../models/userModel.js';
import { generateAdminJwtToken } from '../utils/generateJwtToken.js';
import mongoose from 'mongoose';

const adminController = {
    authAdmin: asyncHandler(async (req, res) => {
        const { name, password } = req.body
        const admin = await adminModel.findOne({ name })

        if (admin && (await admin.matchPassword(password))) {
            generateAdminJwtToken(res, admin._id)

            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                isAdmin: admin.isAdmin

            })
        } else {
            res.status(400)
            throw new Error('Invalid username or password')
        }

    }),
    registerAdmin: asyncHandler(async (req, res) => {
        const { name, password } = req.body

        const admin = await adminModel.create({
            name,
            password,
        })

        if (admin) {
            generateAdminJwtToken(res, admin._id)
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                isAdmin: admin.isAdmin
            })
        } else {
            res.status(400)
            throw new Error('Invalid admin data')
        }
    }),
    logOutAdmin: (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        })
        res.status(200).json({ msg: 'Logged out succesfully' })
    },
    getAllUsers: asyncHandler(async (req, res) => {
        const allUsers = await userModel.find({}, 'id name email');
        res.status(200).json(allUsers)
    }),
    // updateUser: asyncHandler(async (req, res) => {
    //     const user = await adminModel.findById(req.user._id)

    //     if (user) {
    //         user.name = req.body.name || user.name;
    //         user.email = req.body.email || user.email;

    //         if (req.body.password) {
    //             user.password = req.body.password;
    //         }
    //         const updatedUser = await user.save()
    //         res.status(201).json(updatedUser)
    //     } else {
    //         res.status(404);
    //         throw new Error('User not found');
    //     }
    // }),
    addUser: asyncHandler(async (req, res) => {
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
            res.status(200).json({
                msg: 'New user Created',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }),
    deleteUser: async (req, res) => {
        const userId = req.params.id
        const _id = new mongoose.Types.ObjectId(userId);
        try {
            const result = await userModel.deleteOne({ _id });
            res.status(200).json({ msg: 'User deleted successfully' })

        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    },
    getUser: asyncHandler(async (req, res) => {
        const userId = req.params.id
        const _id = new mongoose.Types.ObjectId(userId);
        try {
            const result = await userModel.findById({ _id });
            res.status(200).json({ res: result })
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    }),
    updateUser: asyncHandler(async (req, res) => {

        const { name, email } = req.body
        const userId = req.params.id
        const objectId = new mongoose.Types.ObjectId(userId);
        const result = await userModel.findOneAndUpdate({ _id: objectId }, { name, email }, { new: true })
        res.status(200).json({ msg: "update successfull" })
    }),
    searhUser: asyncHandler(async (req, res) => {
        const q = req.query.q
        const users = await userModel.find({ name: { $regex: q } })
        console.log("🚀 ~ file: adminController.js:139 ~ searhUser:asyncHandler ~ users:", users)
        res.status(200).json(users)
    }),
}

export default adminController