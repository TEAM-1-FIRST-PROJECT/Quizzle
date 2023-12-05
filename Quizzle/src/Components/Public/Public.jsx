import { NavLink } from "react-router-dom";
import SingleQuizCard from "../SingleQuizCard/SingleQuizCard";
import PublicQuizzesTable from "../PublicQuizzesTable/PublicQuizzesTable";
import { useEffect, useState } from "react";
import { getAllQuizzes } from "../../services/quiz.services";
import toast from "react-hot-toast";

const Public = () => {

  const [quizzes, setQuizzes] = useState([{}])
  useEffect(() => {
    getAllQuizzes()
      .then(snapshot => {
        setQuizzes(snapshot)

      })
      .catch(e => toast.error(e));
  }, []);

  return (
    <>
      {quizzes && <div className="h-screen flex flex-col items-center">
        <div className=" max-w-6xl mx-auto px-4 sm:px-6  opacity-80 rounded-lg">
          {/* Hero content */}
          <div className="pt-32 md:pt-10 ">
            {/* Section header */}
            <div className="pt-20 text-center pb-12 md:pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                Welcome to <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">Quizzle</span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                  Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
                </p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                  <div>
                    <NavLink className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" to="/Login"> Log in </NavLink>
                  </div>
                  <div>
                    <NavLink className="text-sm font-semibold leading-6 text-gray-900 pl-10" to="/Register"> Register <span aria-hidden="true">→</span> </NavLink>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div>
              <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
                <div className="flex flex-col justify-center">
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section with Cards */}
        <section className="bg-gray-2 pb-10 pt-5 dark:bg-dark lg:pb-10 lg:pt-10">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.map(quiz => (
                <div key={quiz.id}><SingleQuizCard
                  image="https://i.ibb.co/r2zns1m/image-01.jpg"
                  titleHref="/#"
                  btnHref="/#"
                  Button="View Details"
                  quiz={quiz}
                /></div>
              ))}
            </div>
          </div>
        </section>
      </div>}
    </>
  );
};

export default Public;  