import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import {
  getUserByHandle,
  createUserHandle,
  checkUserPhone,
} from "../../services/users.services";
import { registerUser } from "../../services/auth.services";
import { ROLE_CHECK } from "../../common/constants";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [index, setIndex] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "student",
    phone: "",
    profileImgUrl: "",
    address: "",
  });

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const updateForm = (field) => (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
          ? ROLE_CHECK.educator
          : ROLE_CHECK.student
        : e.target.value;
    setForm({
      ...form,
      [field]: value,
    });
  };

  const text =
    "Quizzes are a popular form of entertainment, but they also have numerous benefits that can contribute to personal and professional development. They require recall of information, which strengthens memory pathways. This makes it easier to retrieve this information later, enhancing long-term memory.";

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleRegisterUser = (e) => {
    e.preventDefault();

    if (!form.email) {
      toast("Email is required!");
      return;
    }

    checkUserPhone(form.phone)
      .then((result) => {
        if (result) {
          toast.error(`user with phone ${form.phone} already exist!`);
          navigate("/register");
        } else {
          getUserByHandle(form.username)
            .then((snapshot) => {
              if (snapshot.exists()) {
                toast.error("Username already exists!");
              }
              return registerUser(form.email, form.password);
            })
            .then((credential) => {
              createUserHandle(
                form.username,
                credential.user.uid,
                credential.user.email,
                form.firstName,
                form.lastName,
                form.role,
                form.phone,
                form.profileImgUrl,
                form.address
              );

              credential.user.value = form.username;
              setUser({
                user: credential.user,
              });
            })
            .then(() => {
              toast.success("User created successfully, redirecting...");
              navigate("/");
            })
            .catch((e) => toast.error(e.message));
        }
      })
      .catch((e) => toast.log(e));
  };
  return (
    <>
      <p className="font-extrabold p-10 text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-400">
        {text
          .slice(0, index)
          .split("")
          .map((char, i) => (
            <span key={i} className="animate-gradient">
              {char}
            </span>
          ))}
      </p>
      <div className="h-screen bg-hero-pattern-2 bg-cover flex items-center justify-center">
        <div className="hidden sm:block  justify-center">
          <form className="w-[650px] mx-auto mb-10 shadow-xl hover:shadow-violet-400 bg-indigo-300 p-6 rounded-lg opacity-80">
            <h2 className="text-4x1 text-3xl mb-8 text-black font-bold text-center">
              Register
            </h2>
            <div className="flex flex-wrap -mx-1">
              <div className="w-full sm:w-1/2 px-5">
                <text className="">First Name</text>
                <input
                  className="rounded-lg  mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.firstName}
                  onChange={updateForm("firstName")}
                />
              </div>
              <div className="w-full sm:w-1/2 px-5">
                <label>Last Name</label>
                <input
                  className="rounded-lg  mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.lastName}
                  onChange={updateForm("lastName")}
                />
              </div>
              <div className="mt-2 w-full sm:w-1/2 px-5">
                <label>Username</label>
                <input
                  className="rounded-lg mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.username}
                  onChange={updateForm("username")}
                />
              </div>
              <div className="mt-2 w-full sm:w-1/2 px-5">
                <label>Phone</label>
                <input
                  className="rounded-lg mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.phone}
                  onChange={updateForm("phone")}
                />
              </div>
              <div className="w-full mt-2 sm:w-1/2 px-5">
                <label>Address</label>
                <textarea
                  className="rounded-lg  mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.address}
                  onChange={updateForm("address")}
                />
              </div>
              <div className="mt-2 w-full sm:w-1/2 px-5">
                <label>Email</label>
                <input
                  className="rounded-lg mt-2 p-2 placeholder-slate-400
            focus:outline-none 
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  type="email"
                  value={form.email}
                  onChange={updateForm("email")}
                />
              </div>
              <div className="mt-2 w-full sm:w-1/2 px-5">
                <label>Password</label>
                <input
                  className="rounded-lg bg-white mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="password"
                  value={form.password}
                  onChange={updateForm("password")}
                />
              </div>
              <div className=" mt-12 w-full sm:w-1/2 px-5">
                <label>I am an educator</label>
                <input
                  className="ml-2"
                  type="checkbox"
                  checked={form.role === ROLE_CHECK.educator}
                  onChange={updateForm("role")}
                />
              </div>
              <button
                className="w-full my-5 py-2 bg-violet-400 shadow-xl hover:shadow-violet-600 text-black font-semibold rounded-lg"
                onClick={handleRegisterUser}
                type="button"
              >
                SIGN UP
              </button>
              <p className="text-black-500 ml-24 hover:text-violet-500 py-2 flex justify-center">
                Already have an account?{" "}
                <Link
                  className="ml-1 dark:text-white hover:animate-pulse mix-blend-color-dodge"
                  to="/Login"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
