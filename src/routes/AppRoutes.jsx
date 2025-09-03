import { Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<Homepage {...props} />} />
        </Routes>
    )
}

export default AppRoutes