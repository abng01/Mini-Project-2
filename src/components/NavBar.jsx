import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className="fixed left-0 w-full top-0 px-6 py-4 bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-2">
            <div className="font-[Artnoova] text-3xl font-semibold mb-2 text-left">
                <NavLink to="/" className="!text-white" >Mitanime</NavLink>
            </div>
            <div className="text-right">
                <NavLink to="/signin">Sign In</NavLink>
            </div>
        </div>

        <nav className="flex justify-between items-center">
            <div className="space-x-6">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/lists">LISTS</NavLink>
                <NavLink to="/search">SEARCH</NavLink>
            </div>
        </nav>
    </header>
  )
}
