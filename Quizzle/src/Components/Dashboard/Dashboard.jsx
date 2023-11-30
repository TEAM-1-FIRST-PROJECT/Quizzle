import { useEffect, useState } from "react";
import SingleQuizCard from "../SingleQuizCard/SingleQuizCard";
import { getAllQuizzes } from "../../services/quiz.services";
import { FaUnlockAlt } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { FaBarsProgress } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import toast from "react-hot-toast";

const Dashboard = () => {

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
      {quizzes && <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-col items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 rounded-lg">
          <div className="pt-32 md:pt-10 ">
            <div className=" text-center pb-12 md:pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                Welcome to <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">Quizzle</span>
              </h1>
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
        {/* Features section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">What is Quizzle?</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to test your knowledge
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Quizzle is your go-to platform for testing your knowledge with a variety of features designed to enhance your learning experience. Take public quizzes, participate in private quizzes created by educators, receive invitations for new knowledge checks, and keep track of your progress and points in your personalized profile.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <FaUnlockAlt className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Public and Private Quizzes
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">Engage in a variety of quizzes, both public and private. Public quizzes offer a diverse range of topics, while private quizzes, curated by educators, provide targeted learning experiences.</dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <IoMdMailUnread className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Personalized Invitations
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">Receive invitations for new knowledge checks tailored to your interests and expertise, ensuring a continuous and personalized learning journey.</dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <FaBarsProgress className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Progress Tracking
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">Monitor your progress and track your points effortlessly within your user profile. Stay motivated as you see your knowledge and skills grow over time.</dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <FaCircleUser className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Interactive User Profile
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">Explore an interactive user profile that showcases your achievements, highlights areas for improvement, and provides insights into your quiz performance.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Dashboard

