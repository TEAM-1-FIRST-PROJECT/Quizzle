import Navbar from "./Components/NavBar/NavBar";
import Sidebar from "./Components/SideBar/SideBar";
import AppRouter from "./components/AppRouter/AppRouter"


const App = () => {


  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-5 p-4">
          <AppRouter />
        </div>
      </div>
    </>
  );
};

export default App;
