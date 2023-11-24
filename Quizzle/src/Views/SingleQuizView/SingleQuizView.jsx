import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import './SingleQuizView.css'


const SingleQuizView = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
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


  const handleSelectAnswer=(selectedAnswer)=>{
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }
  console.log(activeQuestionIndex)
  return (
    <>
      {/* <div id="quiz">
        <div id="question">
          <h2 className="pl-80">{quiz?.title}</h2>
          <ul id="answers">
            {quiz?.questions.map((answer) => (
              <div key={answer.question} className="pl-80">
                <li>{answer.question}</li>
                {answer.answers.map(answers => (
                  <li key={answers.text} className="pl-80">
                    <button onClick={() => handleSelectAnswer(answers.text)}>
                      {answers.text}
                    </button>
                  </li>

                ))}


              </div>
            ))}
          </ul>
        </div>
      </div> */}
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
