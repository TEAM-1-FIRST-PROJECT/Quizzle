import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Categories from "../../components/Categories/Categories";
import Login from "../Login/Login";


const CategoriesView = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? <Categories></Categories> : <Login></Login> }

    </>
  )
}

export default CategoriesView;