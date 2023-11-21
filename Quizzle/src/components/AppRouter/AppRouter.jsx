import { Routes, Route } from 'react-router-dom';
import RegisterForm from "../../views/Register/Register"
import Dashboard from '../Dashboard/Dashboard';
import UserProfile from '../../Views/UserProfile/UserProfile';
import Settings from '../../Views/Settings/Settings';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default AppRouter
