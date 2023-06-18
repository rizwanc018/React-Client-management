import asyncHandler from 'express-async-handler';

const userController = {
    authUser: asyncHandler(async (req, res) => {
        res.status(200).json({ msg: "Hello rrrrrrr" })
    })
}

export default userController