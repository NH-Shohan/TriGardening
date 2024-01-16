import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../public/logo 1.svg';
const Navbar = () => {
  return (
    <div>
      <Image
      src={logoPic}
      alt="Logo Picture"
    />
      <Link href="/">Home</Link>
      <Link href="/allplants">All Plants</Link>
      <Link href="/aboutus">About Us</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/buy">Buy</Link>
      <Link href="/contactus">Contact Us</Link>
      <Link href="/auth/sign-in">Login</Link>
      </div>
  )
}

export default Navbar