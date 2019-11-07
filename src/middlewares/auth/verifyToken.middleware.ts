import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.header('Authorization');
    if (!bearer) return res.status(400).json('empty token')
    const token = bearer.split(" ")[1]
    const payload = jwt.verify(token, process.env.SECRET || "no token") as IPayload;
    req.userId = payload._id
    console.log("token middleware >>>>", token)
    console.log('payload >>>>', payload)
    next()
}