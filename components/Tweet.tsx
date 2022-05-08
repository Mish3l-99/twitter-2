import React, { useEffect, useState } from 'react'
import { CommentBody, Tweet } from '../typings'
import { Comment } from '../typings'
import { TiMessages } from 'react-icons/ti'
import { AiOutlineSwap, AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { HiOutlineUpload } from 'react-icons/hi'
import TimeAgo from 'react-timeago'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  const [like, setLike] = useState<boolean>(false)
  const toggleLike = () => {
    if (like) {
      setLike(false)
    } else {
      setLike(true)
    }
  }
  const [comments, setComments] = useState<Comment[]>([])

  const { data: session } = useSession()

  const [commentBox, setCommentBox] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: input,
      username: session?.user?.name || 'Unknown User',
      profileImage: session?.user?.image || 'https://links.papareact.com/gll',
      tweetId: tweet._id,
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    })
    const json = await result.json()

    const newComments = await fetchComments(tweet._id)
    setComments(newComments)

    toast('Commented!', {
      icon: '🚀',
    })
    return json
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    postComment()
    setInput('')
    setCommentBox(false)
  }

  return (
    <div className="p-2 md:p-6">
      {/* top */}
      <div className="flex space-x-2">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImage}
          alt="/"
        />
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-md flex-1 truncate font-bold md:text-xl">
              {tweet.username}
            </h1>
            <h6 className="text-xs font-semibold text-twitter md:text-sm">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()}
            </h6>
            <TimeAgo
              className="text-xs text-gray-500 md:text-sm"
              date={tweet._createdAt}
            />
          </div>
          <div className="pb-4">
            <p>{tweet.text}</p>
          </div>
        </div>
      </div>

      {/* image */}
      {tweet.image && (
        <div className="mb-4 w-full">
          <img
            className="max-h-[300px] w-full rounded-md object-cover md:max-h-[380px]"
            src={tweet.image}
            alt="/"
          />
        </div>
      )}

      {/* icons */}
      <div className="flex justify-between">
        <div
          className="flex items-center space-x-2"
          onClick={() => session && setCommentBox(!commentBox)}
        >
          <TiMessages />
          <span>{comments?.length}</span>
        </div>
        <div>
          <AiOutlineSwap />
        </div>
        <div onClick={toggleLike}>
          {!like ? (
            <AiOutlineHeart />
          ) : (
            <AiTwotoneHeart className="text-red-500" />
          )}
        </div>
        <div>
          <HiOutlineUpload />
        </div>
      </div>

      {/* comment box logic */}
      {commentBox && (
        <form
          action=""
          onSubmit={handleSumbit}
          className="mt-3 flex items-center space-x-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Write a comment..."
            className="flex-1 rounded-md bg-gray-100 p-2"
          />
          <button
            disabled={!input}
            className="rounded-full bg-twitter px-3 py-1 text-sm text-white disabled:opacity-50"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {/* comments */}
      {comments?.length > 0 && (
        <div className="my-2 max-h-44 space-y-5 overflow-y-scroll border-t p-4 ">
          {comments.map((comment) => (
            <div key={comment._id} className="">
              <div className="relative flex items-center space-x-2">
                <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
                <img
                  src={comment.profileImage}
                  alt="/"
                  className="h-7 w-7 rounded-full object-cover "
                />
                <div className="">
                  <div className="flex items-center space-x-1">
                    <p className="mr-1 font-bold">{comment.username}</p>
                    <p className="hidden text-sm font-semibold text-twitter lg:inline">
                      @{comment.username.replace(/\s+/g, '').toLowerCase()}.
                    </p>
                    <TimeAgo
                      className="text-xs text-gray-500 md:text-sm"
                      date={comment._createdAt}
                    />
                  </div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet
