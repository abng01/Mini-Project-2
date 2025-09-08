import { useState, useContext, useEffect } from 'react'
import { useUserContext } from './context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [submitResult, setSubmitResult] = useState("")

    const { currentUser, handleUpdateUser } = useUserContext()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userPassword.length < 5) {
            setSubmitResult("Password must be at least 5 characters long.")
        } else if (userPassword === userEmail) {
            setSubmitResult("Password must not match email address.")
        } else {
            setSubmitResult("Successfully logged in! Please wait a moment - you will be sent to our homescreen 😍")
            handleUpdateUser({email: userEmail})
            setTimeout(() => navigate("/"), 3000)
        }
    }

    useEffect(() => {
        if (currentUser) {
            console.log('Current user: ', currentUser)
        }
    }, [currentUser])

    return (
        <div className="bg-[#393939] p-10 rounded w-[500px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
                <p className="text-lg">Enter your email:</p>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={userEmail} 
                    className="border-2 border-solid rounded p-1 mb-5 w-[225px]"
                    onChange={(e) => setUserEmail(e.target.value)} />
                <p className="text-lg">Enter a valid password:</p>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={userPassword} 
                    className="border-2 border-solid rounded p-1 mb-5 w-[225px]"
                    onChange={(e) => setUserPassword(e.target.value)} />
                <button type="submit" className="">Login</button>
                <p>{submitResult}</p>
            </form>
        </div>

    )
}
