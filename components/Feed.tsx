import React, { useState } from 'react'
import { Tweet } from '../typings'
import { FiRefreshCw } from 'react-icons/fi'
import TweetBox from './TweetBox'
import TweetComponent from '../components/Tweet'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

const Feed = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets()
    setTweets(tweets)
    toast.success('Feed Updated!', {
      id: refreshToast,
    })
  }
  return (
    <div className=" col-span-8 max-h-screen overflow-y-scroll scrollbar-hide md:col-span-7 lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 text-xl font-bold">Home</h1>
        <FiRefreshCw
          onClick={handleRefresh}
          className="mr-3 mt-5  h-6 w-6 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125 md:h-8 md:w-8"
        />
      </div>

      {/* tweet box */}
      <div className="">
        <TweetBox setTweets={setTweets} />
      </div>

      {/* feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
