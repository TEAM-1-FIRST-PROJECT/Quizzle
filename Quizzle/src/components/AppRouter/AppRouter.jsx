import { Routes, Route } from 'react-router-dom';
import RegisterForm from "../../Views/Register/Register"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  )
}

export default AppRouter
