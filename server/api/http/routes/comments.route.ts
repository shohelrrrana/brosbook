import { Router } from "express"

import { ensureAuth }    from "@middleware/auth"
import CommentController from "@controllers/comment.controller"
import CommentService    from "@services/comment.service"

const router             = Router()
const commentController = new CommentController( new CommentService() )

/**
 * @desc get comments
 * @route GET posts/:postId/comments
 * @access Private
 */
router.get( '/:postId/comments', ensureAuth, commentController.getComments )

/**
 * @desc create comment
 * @route POST posts/:postId/comments
 * @access Private
 */
router.post( '/:postId/comments', ensureAuth, commentController.create )


/**
 * @desc save comment like
 * @route POST posts/:postId/comments/:commentId/likes
 * @access Private
 */
router.post( '/:postId/comments/:commentId/likes', ensureAuth, commentController.saveLike )

/**
 * @desc remove comment like
 * @route DELETE posts/:postId/comments/:commentId/likes
 * @access Private
 */
router.delete( '/:postId/comments/:commentId/likes', ensureAuth, commentController.removeLike )

export default router