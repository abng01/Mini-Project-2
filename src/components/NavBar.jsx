import React from 'react'

export default function NavBar() {
  return (
    <header className="fixed left-0 w-full top-0 px-6 py-4 bg-gray-900 text-white">
        <div className="flex justify-between items-center mb-4">
            <div className="font-[Artnoova] text-3xl font-semibold mb-2 text-left">
                <a href="/" className="!text-white" >Mitanime</a>
            </div>
            <div className="text-right">
                <a href="/signin">Sign In</a>
            </div>
        </div>

        <nav className="flex justify-between items-center">
            <div className="space-x-6">
                <a href="/">HOME</a>
                <a href="/lists">LISTS</a>
                <a href="/search">SEARCH</a>
            </div>
        </nav>
    </header>
  )
}
