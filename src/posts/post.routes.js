import { Router } from 'express'
import { createPost, getAllPosts, getPostsById } from './post.controller.js'

const router = Router()

router.post('/', createPost)

router.get('/', getAllPosts)

router.get('/:id', getPostsById)

export default router
