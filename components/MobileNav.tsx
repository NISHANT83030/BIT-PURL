"use client"
import React from 'react'
import{
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { sideBarItems } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import BitPurlLogo from '@/Bitpurllogo'

const MobileNav = () => {
    const path=usePathname();
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger asChild>
            <Image src='/hamburger.svg' alt='hamburger' width={32} height={32}  className='cursor-pointer sm:hidden'/>
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-[#1C1F2E]'>
        <Link href='/' className='flex items-center gap-1'>
            <BitPurlLogo /> 
      </Link>
        <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
                <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sideBarItems.map((link)=>{
                const isActive = path === link.route || (link.route !== '/' && path.startsWith(link.route))
                return (
                    <SheetClose asChild key={link.route}>

                    <Link 
                    href={link.route}
                    key={link.label}
                    className={cn('flex rounded-lg p-4 mx-3 gap-4 items-center w-full max-w-60',{
                        'bg-[#0E78F9] ':isActive,
                    })} 
                    title={link.label} >
                        <Image src={link.urlIcon} alt={link.label} width={20} height={20}/>
                        <p className=' font-semibold'>{link.label}</p>
                    </Link>
            </SheetClose>
                )
            })}
                </section>
            </SheetClose>
            </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav