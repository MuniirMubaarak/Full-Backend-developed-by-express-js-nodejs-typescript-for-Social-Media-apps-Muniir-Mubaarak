import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { json } from 'stream/consumers';
const prismaClient = new PrismaClient();

interface IcreateUser {
    name: string;
    email: string;
    password: string;
    id?: number; // Optional for auto-generated ID fields in the database.
}


export const createUser = async (req: Request, res: Response) =>{
    try {
        const {name, email, password} = req.body as IcreateUser;
        if(!name || !password|| !email) {
            res.status(404).json({message: "Please enter a username and password"})
            return;
        }
        const createdUser = await prismaClient.users.create({
            data: {
                name,
                email,
                password
            }
        })
        res.status(201).json({
            isSuccess : true,
            message: "User created successfully",
            user: createdUser
        })
    
    } catch (error) {
        
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
    
    if(!userId) {
        res.status(404).json({message: "Please provide a valid user id"})
        return;
    }
    const user = await prismaClient.users.findUnique({
        where: {
            id: userId
        }
    })
    if(!user) {
        res.status(404).json({message: "User not found"})
        return;
    }
    res.json({
        isSuccess: true,
        user
    })
    } catch (error) {
        
    }
}

export const updateUser = async(req:Request, res:Response) => {
    try {
        const userId = req.params.id;
    const {name, email, password} = req.body;
    
    if(!userId) {
        res.status(404).json({message: "Please provide valid user id and name, password, and email"})
        return;
    }
    const updatedUser = await prismaClient.users.update({
        where: {
            id: userId
        },
        data: {
            name,
            email,
            password
        }
    })
    if(!updatedUser) {
        res.status(404).json({message: "User not found"})
        return;
    }
    res.json({
        isSuccess: true,
        user: updatedUser
    })
    } catch (error) {
        
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
    
        if(!userId) {
            res.status(404).json({message: "Please provide a valid user id"})
            return;
        }
        const deletedUser = await prismaClient.users.delete({
            where: {
                id: userId
            }
        })
        if(!deletedUser) {
            res.status(404).json({message: "User not found"})
            return;
        }
        res.json({
            isSuccess: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prismaClient.users.findMany()
        res.json({
            isSuccess: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}