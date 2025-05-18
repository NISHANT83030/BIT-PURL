"use client"
import React, { use } from 'react'
import  { sideBarItems } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import  Link  from 'next/link';
function Sidebar() {
        const path=usePathname();
  return (
    <section className='sticky left-0 top-0 flex justify-between bg-[#1C1F2E] p-6 pt-28 text-white max-sm:hidden
    lg:w-[264px] h-screen
    '>
        <div className="flex flex-col gap-6">
           {
            sideBarItems.map((link)=>{
                const isActive = path === link.route || (link.route !== '/' && path.startsWith(link.route));
                return (
                    <Link 
                    href={link.route}
                    key={link.label}
                    className={cn('rounded-lg p-4 gap-4 flex items-center justify-start',{
                        'bg-[#0E78F9] ':isActive,
                    })} 
                    title={link.label} >
                        <Image src={link.urlIcon} alt={link.label} width={26} height={26}/>
                        <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                    </Link>
                )

            })
           }
        </div>
    </section>
  )
}

export default Sidebar