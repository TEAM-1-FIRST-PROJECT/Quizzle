import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import {
  getUserByHandle,
  createUserHandle,
} from "../../services/users.services";
import { registerUser } from "../../services/auth.services";
// import {
//   MAX_NAME_LENGTH,
//   MIN_NAME_LENGTH,
//   MIN_USER_NAME_LENGTH,
//   PHONE_NUMBER_CHECK,
//   NAME_CHECK
// } from "../../common/constants";

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    isEducator: false,
    phone: "",
    profileImgUrl: "",
  });

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const updateForm = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({
      ...form,
      [field]: e.target.value,
      [field]: field === "isisEducator" ? e.target.checked : value,
    });
  };

  const handleRegisterUser = (e) => {
    e.preventDefault();

    // if (
    //   form.firstName.length < MIN_NAME_LENGTH ||
    //   form.firstName.length > MAX_NAME_LENGTH
    // ) {
    //   alert(
    //     `First name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`
    //   );
    //   return;
    // }
    // if (!NAME_CHECK.test(form.firstName)) {
    //   alert("first name is required");
    //   return;
    // }

    // if (
    //   form.lastName.length < MIN_NAME_LENGTH ||
    //   form.lastName.length > MAX_NAME_LENGTH
    // ) {
    //   alert(
    //     `Last name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`
    //   );
    //   return;
    // }
    // if (!NAME_CHECK.test(form.lastName)) {
    //   alert("Last name is required");
    //   return;
    // }

    // if (
    //   form.username.length < MIN_USER_NAME_LENGTH ||
    //   form.username.length > MAX_NAME_LENGTH
    // ) {
    //   alert(
    //     `User name must be between ${MIN_USER_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters long`
    //   );
    //   return;
    // }

    // if (!PHONE_NUMBER_CHECK.test(form.phone)) {
    //   alert("correct phone number is required");
    //   return;
    // }

    if (!form.email) {
      alert("Email is required");
      return;
    }

    getUserByHandle(form.username)
      .then((snapshot) => {  
        if (snapshot.exists()) {
          alert("Username already exists");
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
          form.isEducator,
          form.phone,
          form.profileImgUrl
        );

        credential.user.value = form.username;
        setUser({
          user: credential.user,
        });
      })
      .then(() => {
        alert("User created successfully, redirecting...");

        navigate("/");
      })
      .catch((e) => console.error(e.message));
  };
  return (
    <>
      <div className="h-screen bg-hero-pattern-2 bg-cover flex items-center justify-center">
        <div className="hidden sm:block mt-20 justify-center">
          <div className="">
            <form className="w-[450px] mx-auto shadow-xl hover:shadow-violet-400 bg-indigo-300 p-6 rounded-lg opacity-80">
              <h2 className="text-4x1 text-3xl text-black font-bold text-center">
                Register
              </h2>
              <div className="flex flex-col text-black py-1">
                <label>First Name</label>
                <input
                  className="rounded-lg  mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.firstName}
                  onChange={updateForm("firstName")}
                />
              </div>
              <div className="flex flex-col text-black py-1">
                <label>Last Name</label>
                <input
                  className="rounded-lg  mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.lastName}
                  onChange={updateForm("lastName")}
                />
              </div>
              <div className="flex flex-col text-black py-1">
                <label>Username</label>
                <input
                  className="rounded-lg mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.username}
                  onChange={updateForm("username")}
                />
              </div>
              <div className="flex flex-col text-black py-1">
                <label>phone</label>
                <input
                  className="rounded-lg mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="text"
                  value={form.phone}
                  onChange={updateForm("phone")}
                />
              </div>
              <div className="flex flex-col text-black py-1">
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
              <div className="flex flex-col text-black py-1">
                <label>Password</label>
                <input
                  className="rounded-lg bg-white mt-2 p-2 focus-within:border-blue-500 focus:outline-none"
                  type="password"
                  value={form.password}
                  onChange={updateForm("password")}
                />
              </div>
              <div className=" flex justify-center mt-1">
                <label>I am an educator</label>
                <input
                  className="ml-2"
                  type="checkbox"
                  value={form.isEducator}
                  onChange={updateForm("isEducator")}
                />
              </div>
              <button
                className="w-full my-5 py-2 bg-violet-400 shadow-xl hover:shadow-violet-600 text-black font-semibold rounded-lg"
                onClick={handleRegisterUser}
                type="button"
              >
                SIGN UP
              </button>
              <p className="text-black-500 hover:text-violet-500 py-2 flex justify-center">
                Already have an account?{" "}
                <Link
                  className="ml-1 dark:text-white hover:animate-pulse mix-blend-color-dodge"
                  to="/Login"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default RegisterForm;
