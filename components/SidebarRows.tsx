import React from 'react'
import { IconType } from 'react-icons'

interface Props {
  Icon: IconType
  title: string
  onClick?: () => {}
}

const SidebarRows = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full py-2 px-1 transition-all duration-300 hover:bg-gray-100 md:px-4 md:py-3"
    >
      <Icon className="h-5 w-5 md:h-6 md:w-6" />
      <p className="hidden text-xl group-hover:text-twitter md:inline">
        {title}
      </p>
    </div>
  )
}

export default SidebarRows
