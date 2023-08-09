"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, LiteralUnion } from 'next-auth/react';

const Navbar = () => {
  const {data: session} = useSession();

  const [providers, setProviders] = useState<any>();
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const callProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    callProviders();
  }, [])

  const handleSignOut = () => {
    signOut();
  }

  const handleSignIn = (providerId: string) => {
    console.log("signin called");
  }

  return (
    <nav className='flex-between w-full mb-16 pt-8'>

      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/prompt-logo.svg" alt="logo" width={30} height={30} className='object-contain' />
        <p className='logo_text'>PromptVista</p>
      </Link>

      {/* desktop nav */}
      <div className='sm:flex hidden'>
        {
          session?.user ?
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className='black_btn'>Create Post</Link>
              <button type='button' onClick={handleSignOut} className='outline_btn'>Sign Out</button>
              <Link href="/profile">
                <p className='mt-1 text-blue-900 text-xl font-bold'>{session?.user.name}</p>
              </Link>
            </div>
            : 
            <>
              {
                providers && 
                  Object.values(providers).map((provider: any) => (
                    <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                      Sign In
                    </button>
                  ))
              }
            </>
        }
      </div>

      {/* mobile nav */}
      <div className='sm:hidden flex relative'>
          {
            session?.user ? (
              <div className='flex'>
                <Image src="/assets/images/prompt-logo.svg" width={37} height={37} className='rounded-full' alt='profile' onClick={() => {
                  setToggleDropDown((prev) => !prev)}}
                />
                {
                  toggleDropDown && 
                    <div className='dropdown'>
                      <Link href="/profile" className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                        My Profile
                      </Link>
                      <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                        Create Prompt
                      </Link>
                      <button type='button' onClick={() => {
                        setToggleDropDown(false)
                        signOut();
                      }} className='mt-5 w-full black_btn'>
                        Sign Out
                      </button>
                    </div>
                }
              </div>
            ) : 
            <>
              {
                providers && 
                  Object.values(providers).map((provider: any) => (
                    <button type='button' key={provider.name} onClick={() => handleSignIn(provider.id)} className='black_btn'>
                      Sign In
                    </button>
                  ))
              }
            </>
          }

      </div>
    </nav>
  )
}

export default Navbar