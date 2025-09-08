import { Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import RandomAnime from '../pages/RandomAnime'
import LoginForm from '../components/LoginForm'
import Search from '../pages/Search'
import UserList from '../pages/UserList'

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<Homepage {...props} />} />

            <Route path="/random" element={<RandomAnime {...props} />} />
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/search" element={<Search />} />
            <Route path="/lists" element={<UserList/>} />
        </Routes>
    )
}

export default AppRoutes