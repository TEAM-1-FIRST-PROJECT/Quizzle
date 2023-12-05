import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { loginUser } from "../../services/auth.services";
import toast from "react-hot-toast";
import { getUserDataByEmail } from "../../services/users.services";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateForm = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (!form.email) {
      alert("Email is required");
    }
    if (!form.password) {
      alert("Password is required");
      return;
    }
    console.log(form.email)
    getUserDataByEmail(form.email)
      .then((snapshot) => {
        if (Object.values(snapshot.val())[0].isBlocked) {
          alert("Your account is blocked, try again within 90 days")
          return;
        }

        loginUser(form.email, form.password)
          .then((credential) => {
            setUser({
              user: credential.user,
            });
          })
          .then(() => {
            toast.success("Login successful, redirecting...");
            navigate("/");
          })
          .catch((err) => {
            alert(err.message);
          });
      })
  };

  return (
    <>
      <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-row items-center justify-center pb-20">
        <div className=" flex flex-col justify-center">
          <form className="w-[450px] mx-auto shadow-xl hover:shadow-violet-400 bg-indigo-300 p-8 rounded-lg opacity-80">
            <h2 className="text-4x1 text-3xl dark:text-white font-bold text-center">
              Login
            </h2>
            <div className="flex flex-col text-black py-2">
              <label>Email</label>
              <input
                className="rounded-lg mt-2 p-2 focus-within:border-blue-500 shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={updateForm("email")}
              />
            </div>
            <div className="flex flex-col text-black py-2">
              <label>Password</label>
              <input
                className="rounded-lg dark:bg-white mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={updateForm("password")}
              />
            </div>
            <div className="flex justify-between text-black py-2">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" /> Remember Me
              </p>
              <Link >Forgot Password</Link>
            </div>
            <button
              className="w-full my-5 py-2 bg-violet-400 shadow-xl hover:shadow-violet-600 dark:text-white font-semibold rounded-lg"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="text-indigo-500 py-2 flex justify-center">
              Don&#39;t have an account?{" "}
              <Link
                className="ml-1 dark:text-white hover:animate-pulse mix-blend-color-dodge"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>

  );
};
export default Login
