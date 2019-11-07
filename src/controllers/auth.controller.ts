import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser, IUserSaved } from "../models/user.model";

export const signUp = async (req: Request, res: Response) => {
    console.log(req.body)
    let token: any
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = await user.encrypt(user.password);
    const savedUser: any = await user.save().then((response: any) => {
        return response
    }).catch(error => {
        console.log("save user ERROR >>>>", error)
        if (error.code === 11000) {
            return "duplicated email"
        }
        return error
    })

    if (savedUser.id) {
        token = jwt.sign({ _id: savedUser.id }, process.env.SECRET || "tokentest")
    }

    res.header("Authorization").json({
        token: token,
        message: savedUser
    })
}
export const signIn = async (req: Request, res: Response) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).json('email not found')
    console.log(req.body)
    const validPassword: boolean = await user.validatePassword(req.body.password)
    if (!validPassword) return res.status(400).json('invalid password')

    const token = jwt.sign({ _id: user.id }, process.env.SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24
    })

    res.header("auth-token", token).json(token)
}
export const Profile = async (req: Request, res: Response) => {
    console.log(req.header('Authorization'))
    const user = await User.findById(req.userId, { password: 0 })
    if (!user) return res.status(404).json('profile not found')

    res.json({
        response: user
    })
}