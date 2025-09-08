import React from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { currentUser, handleUpdateUser, isLoggedIn } = useUserContext();
  const navigate = useNavigate()

  const handleLogout = () => {
    handleUpdateUser(null)
    console.log(currentUser)
  }

  const handleRandom = () => {
    e.preventDefault()
    navigate('/random')
  }

  return (
    <header className="absolute left-0 w-full top-0 px-6 py-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-2">
        <div className="font-[Artnoova] text-3xl font-semibold mb-2 text-left">
          <NavLink to="/" className="!text-white">
            AnimeVault
          </NavLink>
        </div>
        <div className="text-right">
            {isLoggedIn ? (
                <button onClick={handleLogout} className="logout">Logout</button>
            ) : (
                <NavLink to="/login">Login</NavLink>
            )}
        </div>
      </div>

      <nav className="flex justify-between items-center">
        <div className="space-x-6">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/random" onClick={handleRandom}>RANDOM</NavLink>
          {isLoggedIn && <NavLink to="/lists">LISTS</NavLink>}
          <NavLink to="/search">SEARCH</NavLink>
        </div>
      </nav>
    </header>
  );
}
