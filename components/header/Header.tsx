import { Session } from 'next-auth'
import React from 'react'
import { SiThemoviedatabase } from "react-icons/si";
import SearchBar from '../SearchBar';
import { IoNotificationsSharp } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { getInitials } from '@/lib/utils';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import Logo from '../Logo';


const Header = (session : {session : Session}) => {
  return (
    <header className='p-6 flex flex-row justify-around items-center'>
      <div className='flex flex-row items-center gap-5'>
        {/* Logo */}
        <Logo />
        {/* Navigation */}
        <div className='hidden md:block'>
        </div>
      </div>
      <div className='flex flex-row items-center gap-5'>
          {/* Search */}
          <div className='hidden md:block'>
            <SearchBar />
          </div>
        <ColorSchemeToggle />
          {/* Notification */}
          <IoNotificationsSharp size={25}/>

          {/* Profile */}
      </div>
    </header>
  )
}

export default Header