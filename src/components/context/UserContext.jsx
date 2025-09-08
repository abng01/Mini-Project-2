import React, { useState, useContext, useEffect } from 'react'

const UserContext = React.createContext({
    currentUser: null,
    handleUpdateUser: () => {},
    isLoggedIn: false
})

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser))
        } else {
            localStorage.removeItem("user")
        }
    }, [currentUser])

    const handleUpdateUser = (user) => {
        setCurrentUser(user)
    }

    const isLoggedIn = currentUser !== null

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser, isLoggedIn }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)