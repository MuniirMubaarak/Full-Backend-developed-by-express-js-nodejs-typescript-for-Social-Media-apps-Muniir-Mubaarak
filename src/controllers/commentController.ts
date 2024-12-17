import { PrismaClient } from '@prisma/client';
import exp from 'constants';
import express, {Request, Response} from 'express';
const app = express();
const prisma = new PrismaClient();

export const getAllComments = async (req: Request, res: Response) => {
    const comments = await prisma.comments.findMany({
        include: {
            user: true,
            post: true
        }
    })
    res.json({isSuccess: true,comments})
}

export const createComment = async (req: Request, res: Response) => {
    try {
        const {content, post_id, user_id} = req.body;
        if(!content|| !post_id|| !user_id){
            res.status(404).json({
                isSuccess: false,
                message: "Content, post_id and user_id are required"
            });
            return;
        }
        const post = await prisma.posts.findUnique({
            where: {
                id: post_id
            }
        })
        if(!post){
            res.status(404).json({
                isSuccess: false,
                message: "Post not found"
            });
            return;
        }
        const user = await prisma.users.findUnique({
            where: {
                id: user_id
            }
        })
        if(!user){
            res.status(404).json({
                isSuccess: false,
                message: "User not found"
            });
            return;
        }
        // Else all of that
        const newComment = await prisma.comments.create({
            data: {
                content,
                post_id,
                user_id
            },
            select: {
                id: true,
                content: true,
                created_at: true,
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                        content: true
                    }
                },
                updated_at: true
            }
    
        })
        res.json({isSuccess: true, comment: newComment})
    } catch (error) {
        res.status(505).json({
            isSuccess: false,
            message: error
        })
    }
} 

export const getCommentById = async(req: Request, res: Response) => {
   try {
    const commentId = req.params.id;
    const comment = await prisma.comments.findUnique({
        where: {
            id: commentId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            },
            post: {
                select: {
                    title: true,
                    content: true
                }
            }
        }
    })
    if(!comment){
        res.status(404).json({
            isSuccess: false,
            message: "Comment not found"
        });
        return;
    }
    res.json({isSuccess: true, comment})
   } catch (error) {
    res.status(500).json({
        isSuccess: false,
        message: error
    })
   }
}

export const updateComment = async(req: Request, res: Response) => {
    try {
        const commentId = req.params.id;
        const {content} = req.body;
        const comment = await prisma.comments.findUnique({
            where: {
                id: commentId
            }
        })
        if(!comment){
            res.status(404).json({
                isSuccess: false,
                message: "Comment not found"
            });
            return;
        }
        const updatedComment = await prisma.comments.update({
            where : {
                id: commentId
            },
            data : {
                content: content
            },
            select: {
                id: true,
                content : true,
                created_at : true,
                updated_at : true,
                user: {
                    select: {
                        name: true
                    }
                },
                post: {
                    select: {
                        title: true,
                        content: true
                    }
                }
            }
        })
        res.json({isSuccess: true, comment: updatedComment})
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error
        })
    }
}

export const deleteComment = async(req: Request, res: Response) => {
    try {
        const commentId = req.params.id;
        if(!commentId){
            res.status(400).json({
                isSuccess: false,
                message: "Comment ID is required"
            });
            return;
        }
        const deletedComment = await prisma.comments.delete({
            where: {
                id: commentId
            }
        })
        res.status(200).json({
            isSuccess: true,
            message: "Comment deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error
        })
    }
}