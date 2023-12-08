import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizzesByCategory } from '../../../services/quiz.services';
import SingleCard from '../../SingleQuizCard/SingleQuizCard';
import toast from 'react-hot-toast';

const QuizListByCategory = () => {
  const { category } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzesByCategory(category)
      .then(quizzes => {
        setQuizzes(quizzes);
      })
      .catch(e => toast.error(e));
  }, [category]);

  return (
    <div className="h-screen  flex flex-col items-center">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8  rounded-lg">
      <div className="pt-32 md:pt-10 ">
        <div className=" text-center pb-12 md:pb-16 dark:text-zinc-100">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
            Explore all quizzes from <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">{category}</span>
          </h1>
        </div>
      </div>
    </div>
    <section className=" pb-10 pt-5 dark:bg-dark lg:pb-10 lg:pt-10">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz, index) => (
            <div key={index}>
              <SingleCard
                image="https://i.ibb.co/r2zns1m/image-01.jpg"
                titleHref="/#"
                btnHref="/#"
                Button="View Details"
                quiz={quiz}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

export default QuizListByCategory;