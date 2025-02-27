import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image
        src="https://github.com/munsterDev/cinebuster/blob/main/public/site_logo.png"
        alt='Site Logo'
        width={100}
        height={100}
    />
  )
}

export default Logo