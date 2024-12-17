import { PrismaClient } from '@prisma/client';
import exp from 'constants';
import express, {Request, Response} from 'express';
const prisma = new PrismaClient();



export const getAllReactions = async (req: Request, res: Response)=> {
    try {
        const comments = await prisma.reactions.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                },
                post: {
                    select: {
                        title: true
                    }
                }
            }
        })
        res.json({
            isSuccess : true,
            data: comments
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error
        })
    }
}

export const createReaction = async (req: Request, res: Response)=> {
    try {
        const {type, post_id, user_id} = req.body;
        if(!type || !post_id|| !user_id) {
            res.status(400).json({
                isSuccess: false,
                message: "All fields are required"
            })
            return;
        }
        const user = await prisma.users.findUnique({
            where: {
                id: user_id
            }
        })
        const post = await prisma.posts.findUnique({
            where: {
                id: post_id
            }
        })
        if(!user ||!post) {
            res.status(404).json({
                isSuccess: false,
                message: "User or post not found"
            })
            return;
        }
    
        const createdReaction = await prisma.reactions.create({
            data: {
                type_id : type,
                post_id,
                user_id
            }
        })
        res.json({
            isSuccess: true,
            data: createdReaction
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error
        })
    }
}

export const deleteReaction = async (req: Request, res: Response)=> {
    try {
        const reactionId = req.params.id;
        const reaction = await prisma.reactions.findUnique({
            where: {
                id: reactionId
            }
        })
        if(!reaction){
            res.status(404).json({
                isSuccess: false,
                message: "Reaction not found"
            })
            return;
        }
        await prisma.reactions.delete({
            where: {
                id: reactionId
            }
        })
        res.json({
            isSuccess: true,
            message: "Reaction deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error
        })
    }
}

export const UpdateReaction = async (req: Request, res: Response) => {
    try {
        const reactionId = req.params.id;
        const {type} = req.body;
        const reaction = await prisma.reactions.findUnique({
            where: {
                id: reactionId
            }
        })
        if(!reaction || !type){
            res.status(404).json({
                isSuccess: false,
                message: "Reaction not found or type not provided"
            })
            return;
        }
        const updatedReaction = await prisma.reactions.update({
            where: {
                id: reactionId
            },
            data: {
                type_id : type
            }
        })
        res.json({
            isSuccess: true,
            data: updatedReaction
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error
        })
    }
}

export const getReactionById = async (req: Request, res: Response)=> {
    try {
        const reactionId = req.params.id;
        if(!reactionId) return
        const reaction = await prisma.reactions.findUnique({
            where: {
                id: reactionId
            },
            include: {
                post: {
                    select: {
                        title: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }

            }
        })
        if(!reaction) {
            res.status(404).json({
                isSuccess: false,
                message: "Reaction not found"
            })
            return;
        }
        res.json({
            isSuccess: true,
            data: reaction
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error
        })
    }
}