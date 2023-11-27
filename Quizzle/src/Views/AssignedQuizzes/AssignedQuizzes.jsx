import { useState, useEffect } from "react";
import { getAllQuizzes } from "../../services/quiz.services";
import SingleCard from "../../components/SingleQuizCard/SingleQuizCard";

const AssignedQuizzes = () => {

  const [quizzes, setQuizzes] = useState([{}])
  useEffect(() => {
    getAllQuizzes()
      .then(snapshot => {

        setQuizzes(snapshot)

      })
      .catch(e => console.error(e));
  }, []);

  return (
    <section className="bg-gray-2 pb-10 pt-5 dark:bg-dark lg:pb-10 lg:pt-10">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map(quiz => (
            <div key={quiz?.id}><SingleCard
              image="https://i.ibb.co/r2zns1m/image-01.jpg"
              quiz={quiz}
            /></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AssignedQuizzes
