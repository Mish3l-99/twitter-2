import React from 'react'
import SidebarRows from './SidebarRows'
import { BsTwitter, BsPerson } from 'react-icons/bs'
import { AiOutlineHome, AiOutlineBell } from 'react-icons/ai'
import { BiHash, BiEnvelope, BiBookmarks } from 'react-icons/bi'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { CgMoreR } from 'react-icons/cg'
import { signIn, signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <div className="col-span-1 flex flex-col items-center md:col-span-2 md:items-start">
      <div className="logo my-3">
        <BsTwitter className="h-8 w-8 p-1 md:h-12 md:w-12" />
      </div>
      <div>
        <SidebarRows Icon={AiOutlineHome} title="Home" />
        <SidebarRows Icon={BiHash} title="Explore" />
        <SidebarRows Icon={AiOutlineBell} title="Notifications" />
        <SidebarRows Icon={BiEnvelope} title="Messages" />
        <SidebarRows Icon={BiBookmarks} title="Bookmarks" />
        <SidebarRows Icon={HiOutlineClipboardList} title="Lists" />
        <SidebarRows
          onClick={session ? signOut : signIn}
          Icon={BsPerson}
          title={session ? 'Sign Out' : 'Login'}
        />
        <SidebarRows Icon={CgMoreR} title="More" />
      </div>
    </div>
  )
}

export default Sidebar
