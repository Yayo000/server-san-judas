import { Router } from 'express'
import { createPost, getAllPosts, getPostsById } from './post.controller.js'
import { createPostValidator, getPostValidator} from '../../middlewares/post-validator.js'

const router = Router()

router.post('/', createPostValidator, createPost)

router.get('/', getAllPosts)

router.get('/:id', getPostValidator, getPostsById)

export default router
