import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express';

const prismaClient = new PrismaClient();

export const getAllPosts = async (req: Request, res: Response) => {
    const posts =await prismaClient.posts.findMany({
        include: {
            user : true
        }
    })
    res.json({isSuccess: true, posts});
}

export const createPost = async (req: Request, res: Response) => {
    const {title, content, authorId } = req.body;
    if(!title||!content||!authorId){
        res.status(400).json({
            isSuccess: false,
            message: "Title, content and authorId are required fields"
        })
        return;
    }
    // Verify the user
    const user = await prismaClient.users.findUnique({
        where: {
            id: authorId
        }
    })
    if(!user){
        res.status(404).json({
            isSuccess: false,
            message: "User not found"
        })
        return;
    }
    const post = await prismaClient.posts.create({
        data: {
            title,
            content,
            authorId
        }
    })
    res.json({isSuccess: true, post});
}

export const updatePosts = async(req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const {title, content } = req.body;
        if(!title||!content){
            res.status(404).json({message: "No title or content"})
        }
        //Verify the post
        const post = await prismaClient.posts.findUnique({
            where: {
                id: postId
            }
        })
        if(!post){
            res.status(404).json({message: "Post not found"})
            return;
        }
        const updatedPost = await prismaClient.posts.update({
            where: {
                id: postId
            },
            data: {
                title,
                content
            }
        })
        res.json({isSuccess: true, updatedPost}); 
    } catch (error) {
        
    }
}

export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await prismaClient.posts.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true
            }
        })
        if(!post){
            res.status(404).json({message: "Post not found"})
            return;
        }
        res.json({isSuccess: true, post});
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error
        })
    }
}


export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await prismaClient.posts.findUnique({
            where: {
                id: postId
            }
        })
        if(!post){
            res.status(404).json({message: "Post not found"})
            return;
        }
        await prismaClient.posts.delete({
            where: {
                id: postId
            }
        })
        res.json({isSuccess: true, message: "Post deleted"})
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}