import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";


const SingleQuizView = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

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

  return (
    <div id="quiz">
      <div id="question">
        <h2 className="pl-80">{quiz?.title}</h2>
        <ul id="answers">
          {quiz?.questions.map((answer) => (
            <div key={answer.question} className="pl-80">
              <li>{answer.question}</li>
              {answer.answers.map(answ =>(
                <li key={answ.text} className="pl-80">
                  <button onClick={() => {}}>
                  {answ.text}
              </button>
                </li>
                
              ))}
              
              
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SingleQuizView
