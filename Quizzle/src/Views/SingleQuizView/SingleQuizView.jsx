import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import './SingleQuizView.css'


const SingleQuizView = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0)
  const activeQuestionIndex = userAnswers.length;

  useEffect(() => {
    getQuizById(id)
      .then((fechedQuiz) => {
        setQuiz(fechedQuiz);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setQuiz(null);
      });
  }, [id]);
  const quizIsComplete = activeQuestionIndex === quiz?.questions.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }
  useEffect(() => {
    if (userAnswers[activeQuestionIndex - 1]?.isCorrect) {
      setScore((score) => score + 1);
    }
  }, [userAnswers, activeQuestionIndex]);

  if (quizIsComplete) {
    //console.log(score)
    return (
      <div id="summary">

        <h2>Quiz Completed!{score}</h2>
      </div>
    );
  }

  return (
    <>
      <div id="quiz">
        <div id="question">
          <h2>{quiz?.questions[activeQuestionIndex].question}</h2>
          <ul id="answers">
            {quiz?.questions[activeQuestionIndex].answers.map((answer) => (
              <div key={answer.text}>
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer.text}
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SingleQuizView
