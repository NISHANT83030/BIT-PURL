import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import BitPurlLogo from '@/Bitpurllogo'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
const Navbar = () => {
return (
  <nav className="flex-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10">
   <Link href="/" className='flex items-center gap-1'>
       <BitPurlLogo/>
   </Link>
   <div className="flex-between gap-4">
    {/* clerk login */}
    <SignedIn>
        <UserButton/>
    </SignedIn>
    <MobileNav/>
   </div>
  </nav>
)
}

export default Navbar