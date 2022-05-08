import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { GoLocation } from 'react-icons/go'
import { BsSearch, BsImage, BsArrowBarRight } from 'react-icons/bs'
import { BiCalendarEvent, BiHappy } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>('')
  const [imgBox, setImgBox] = useState<boolean>(false)

  const [image, setImage] = useState<string>('')

  const { data: session } = useSession()

  const imageInputRef = useRef<HTMLInputElement>(null)

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImgBox(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImage: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })
    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Posted!', {
      icon: '👏',
    })
    return json
  }

  const handleSumbit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    postTweet()
    setInput('')
    setImage('')
    setImgBox(false)
  }

  return (
    <div className="z-30 mb-2 flex items-center space-x-4 rounded-md bg-white px-2 pb-2 shadow-md">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || 'https://links.papareact.com/gll'}
        alt="/"
      />
      <div className="flex flex-1">
        <form action="" className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="what's happening?"
          />
          <div className="flex items-center ">
            <div className="flex flex-1 space-x-2 text-twitter">
              <BsImage
                onClick={() => setImgBox(!imgBox)}
                className="h-5 w-5 cursor-pointer transition-all duration-200 ease-out hover:scale-125"
              />
              <BsSearch className="h-5 w-5" />
              <BiHappy className="h-5 w-5" />
              <BiCalendarEvent className="h-5 w-5" />
              <GoLocation className="h-5 w-5" />
            </div>
            <button
              onClick={handleSumbit}
              disabled={!input || !session}
              className="rounded-full bg-twitter py-1 px-2 font-bold text-white disabled:opacity-60 md:px-5"
            >
              <span className="hidden md:inline">Tweet</span>
              <span className="md:hidden">
                <BsArrowBarRight />
              </span>
            </button>
          </div>
          {imgBox && (
            <form
              className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4"
              action=""
            >
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent  text-white placeholder:text-white"
                type="text"
                placeholder="Enter image url"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              alt="/"
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
