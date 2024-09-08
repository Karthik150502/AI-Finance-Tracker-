'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs'
import logo from './../../assets/logo-no-bg.png';

export default function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-5 ml-auto mr-auto w-11/12 flex justify-between items-center shadow-sm rounded-full'>
            <div className='flex flex-row items-center'>
                <Image src={logo} alt='Logo' width={150} height={150} />
            </div>
            {isSignedIn ? (
                <>
                    <UserButton />
                </>
                // <p className='text-sm font-light md:hidden sm:hidden'>Your personal finance tracker!</p>
            ) : (
                <>
                    <p className='text-sm font-light md:hidden sm:hidden'>Your personal finance tracker!</p>
                    <div className='flex gap-3 items-center'>
                        <Link href="/sign-in" >
                            <Button className='bg-slate-800 hover:bg-slate-700 rounded-full font-light drop-shadow-lg'>
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className='bg-white rounded-full text-black font-light drop-shadow-lg hover:bg-slate-100'>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </div >
    )
}
