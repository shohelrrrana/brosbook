import React, { useEffect, useState } from 'react'
import { SRLWrapper }                 from "simple-react-lightbox"
import OutlinedFavoriteIcon           from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteIcon                   from '@mui/icons-material/Favorite'
import CommentIcon                    from "@mui/icons-material/ModeCommentOutlined"
import IosShareIcon                   from "@mui/icons-material/IosShare"
import moment                         from "moment"
import Link                           from "next/link"
import { Zoom }                       from "@mui/material"

import Avatar                                 from "@components/common/Avatar"
import { Post }                               from "@interfaces/posts.interfaces"
import CommentList                            from "@components/home/PostCard/CommentList"
import { useLikeMutation, useUnlikeMutation } from "@services/postsApi"

interface PostCardProps {
    post: Post
}

const PostCard = ( { post }: PostCardProps ) => {
    //hooks
    const [like, { isSuccess: isLikeSuccess }]     = useLikeMutation()
    const [unlike, { isSuccess: isUnlikeSuccess }] = useUnlikeMutation()

    const [hasCurrentUserLike, setHasCurrentUserLike] = useState<boolean>( post.hasCurrentUserLike )
    const [likeCount, setLikeCount]                   = useState<number>( post.likeCount )
    const [clickComment, setClickComment]             = useState<boolean>( false )

    useEffect( () => {
        if( isLikeSuccess ){
            setHasCurrentUserLike( true )
            setLikeCount( likeCount + 1 )
        }
    }, [isLikeSuccess] )

    useEffect( () => {
        if( isUnlikeSuccess ){
            setHasCurrentUserLike( false )
            setLikeCount( likeCount - 1 )
        }
    }, [isUnlikeSuccess] )

    async function handlePostLike(){
        like( post.id )
    }

    async function handlePostUnlike(){
        unlike( post.id )
    }

    return (
        <div className="box p-6 mt-6" id={ `post-${ post.id }` }>
            <div className="flex">
                <Link href={ `/${ post.username }` }>
                    <a>
                        <Avatar src={ post.user.photo }/>
                    </a>
                </Link>
                <div className="ml-4">
                    <Link href={ `/${ post.username }` }>
                        <a>
                            <h3 className="text-md font-medium">
                                { post.user.fullName }
                            </h3>
                        </a>
                    </Link>
                    <p className="text-gray-500 font-medium text-xs">
                        { moment( post.createdAt ).fromNow( true ) }
                    </p>
                </div>
            </div>
            <div>
                { post.content && (
                    <div className="my-1">
                        { post.content }
                    </div>
                ) }
                { post.photo && (
                    <div className="my-3">
                        <SRLWrapper>
                            <a href={ post.photo }>
                                <img src={ post.photo }/>
                            </a>
                        </SRLWrapper>
                    </div>
                ) }
                <div
                    className="flex mt-2 border-t-2 border-b-2 border-gray-100 py-1 border-solid justify-around">
                    <div className="flex items-center text-pink-500 relative">
                        <Zoom in={ hasCurrentUserLike }>
                            <button
                                onClick={ handlePostUnlike }
                                className="mr-2 hover:bg-pink-100 rounded-full p-2 duration-300 absolute"
                            >
                                <FavoriteIcon/>
                            </button>
                        </Zoom>
                        <Zoom in={ ! hasCurrentUserLike }>
                            <button
                                onClick={ handlePostLike }
                                className="mr-2 hover:bg-pink-100 rounded-full p-2 duration-300"
                            >
                                <OutlinedFavoriteIcon/>
                            </button>
                        </Zoom>
                        <p>{ likeCount }</p>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <button className="mr-2" onClick={ () => setClickComment( true ) }>
                            <CommentIcon/>
                        </button>
                        <p>{ post.commentCount }</p>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <button className="mr-2">
                            <IosShareIcon/>
                        </button>
                    </div>
                </div>

                <CommentList postId={ post.id } clickComment={ clickComment }/>

            </div>
        </div>
    )
}

export default PostCard
