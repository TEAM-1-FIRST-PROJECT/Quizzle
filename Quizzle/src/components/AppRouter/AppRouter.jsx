import { Routes, Route } from 'react-router-dom';
import RegisterForm from "../../views/Register/Register"
import Dashboard from '../Dashboard/Dashboard';
import UserProfile from '../../views/UserProfile/UserProfile';
import Settings from '../../views/Settings/Settings';
import Login from '../../views/Login/Login'
import CreateNewQuiz from '../../views/CreateNewQuiz/CreateNewQuiz';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createNewQuiz" element={<CreateNewQuiz />} />
    </Routes>
  )
}

export default AppRouter
