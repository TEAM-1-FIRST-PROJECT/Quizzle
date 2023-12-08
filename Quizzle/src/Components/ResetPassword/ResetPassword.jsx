import { sendPasswordResetEmail } from "firebase/auth";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Password reset email sent!');
                navigate('/login');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <div className="flex flex-col h-screen items-center mt-20">
            <div className="border w-[450px] mx-auto shadow-xl hover:shadow-violet-400 bg-indigo-300 p-8 rounded-lg opacity-80">
                <h1 className="text-center mb-5 text-xl dark:text-zinc-200">Password Reset</h1>
                <div className="">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <label className="text-lg">Write an Email</label> <br />
                        <input 
                            className="rounded py-2 px-4 dark:bg-zinc-300" 
                            placeholder="Email" 
                            type="email" 
                            required 
                            onChange={(e) => setEmail(e.target.value)} 
                        /> <br/>
                        <button className="w-full my-5 py-2 bg-violet-400 shadow-xl hover:shadow-violet-600 dark:text-white font-semibold rounded-lg transform transition duration-500 ease-in-out hover:scale-90" type="submit">Reset</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
