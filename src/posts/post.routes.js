import { Router } from 'express'
import { createPost, getAllPosts, getPostsById } from './post.controller.js'
import { createPostValidator

 } from '../../middlewares/post-validator.js'

const router = Router()

router.post('/', createPostValidator, createPost)

router.get('/', getAllPosts)

router.get('/:id', getPostsById)

export default router
