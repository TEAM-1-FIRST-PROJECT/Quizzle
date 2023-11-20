import Navbar from "./Components/NavBar/NavBar";
import Sidebar from "./Components/SideBar/SideBar";
import AppRouter from "./components/AppRouter/AppRouter"

const App = () => {


  return (
    <>
       <Navbar />
      <Sidebar />
      <AppRouter></AppRouter>
    </>
  );
};

export default App;
