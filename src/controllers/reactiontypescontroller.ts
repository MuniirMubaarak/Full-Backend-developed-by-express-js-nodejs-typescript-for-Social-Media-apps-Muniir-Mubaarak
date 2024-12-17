import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const prisma = new PrismaClient();

export const getAllReactionTypes = async (req: Request, res: Response) => {
    try {
        const reactionTypes = await prisma.reaction_types.findMany({
            include: {
                reactions: true,
            }
        })
        res.json({isSuccess: true ,reactionTypes});
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Something went wrong",
            error: error,
        })
    }
}

export const createReactionType = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;
        if(!name){
            res.status(400).json({
                isSuccess: false,
                message: "Name is required"
            });
            return;
        }
        const createdReactionType = await prisma.reaction_types.create({
            data: {
                name
            }
        })
        res.json({isSuccess: true, createdReactionType});
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Something went wrong",
            error: error,
        })
    }
}

export const updateReactionType = async (req: Request, res: Response) => {
    try {
        const reactionTypeId = req.params.id;
        const {name} = req.body;
        if(!reactionTypeId || !name) {
            res.status(400).json({
                isSuccess: false,
                message: "Reaction Type ID is required"
            });
            return;
        }
        const ReactionType = await prisma.reaction_types.findUnique({
            where: {
                id: reactionTypeId
            }
        })
        if(!ReactionType) {
            res.status(404).json({
                isSuccess: false,
                message: "Reaction Type not found"
            })
        }
    
        const updatedReactionType = await prisma.reaction_types.update({
            where: {
                id: reactionTypeId
            },
            data: {
                name
            }
        })
        res.json({isSuccess: true, updatedReactionType});
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Something went wrong",
            error: error
        })
    }

}


export const deleteReactionType = async (req: Request, res: Response) => {
    try {
        const reactionTypeId = req.params.id;
        if(!reactionTypeId) {
            res.status(400).json({
                isSuccess: false,
                message: "Reaction Type ID is required"
            });
            return;
        }
        const reactionType = await prisma.reaction_types.findUnique({
            where: {
                id: reactionTypeId
            }
        })
        if(!reactionType) {
            res.status(404).json({
                isSuccess: false,
                message: "Reaction Type not found"
            })
        }
        await prisma.reaction_types.delete({
            where: {
                id: reactionTypeId
            }
        })
        res.status(200).json({
            isSuccess: true,
            message: "Reaction Type deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Something went wrong",
            error: error,
        })
    }

}

export const getReactionTypeById = async (req: Request, res: Response) => {
    try {
        const reactionTypeId = req.params.id;
        if(!reactionTypeId) {
            res.status(400).json({
                isSuccess: false,
                message: "Reaction Type ID is required"
            });
            return;
        }
        const reactionType = await prisma.reaction_types.findUnique({
            where: {
                id: reactionTypeId
            },
            include : {
                reactions: true
            }
        })
        if(!reactionType) {
            res.status(404).json({
                isSuccess: false,
                message: "Reaction Type not found"
            })
            return;
        }
        res.json({isSuccess: true, reactionType});
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Something went wrong",
            error: error,
        })
    }
 
}