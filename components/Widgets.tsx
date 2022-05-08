import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const Widgets = () => {
  return (
    <div className="col-span-2 mt-2 hidden px-2 lg:inline">
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <BsSearch />
        <input
          type="text"
          placeholder="Search twitter.."
          className="flex-1 bg-transparent"
        />
      </div>
      <div>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 1000 }}
        />
      </div>
    </div>
  )
}

export default Widgets
