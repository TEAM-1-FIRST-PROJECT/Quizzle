import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import Timer from "../../components/Timer/Timer";
import { AuthContext } from "../../context/authContext";
import QuizResolved from "../../components/QuizResolved/QuizResolved";
import dice from "../../assets/dice.gif";
import { updateUserScore } from "../../services/users.services"
import toast from "react-hot-toast";
import {
  removeAssignmentsFromQuiz,
  removeAssignmentsFromUser,
  removeFromAssignments
} from "../../services/quiz.services";


const SingleQuizView = () => {

  const { id } = useParams();
  const { userData } = useContext(AuthContext)
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timerFinished, setTimerFinished] = useState(false);
  const [isQuizResolved, setIsQuizResolved] = useState(false);
  const activeQuestionIndex = userAnswers.length;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuizById(id)
      .then((fetchedQuiz) => {
        setQuiz(fetchedQuiz);
        setQuestions(fetchedQuiz.question);
      })
      .catch((error) => {
        toast.error("Error fetching quiz details:", error);
        setQuiz(null);
      });
  }, [id]);

  useEffect(() => {
    if (userData?.score) {
      setIsQuizResolved(Object.values(userData?.score).map(el => el.id).includes(id))
    }
  }, [id, userData?.score]);

  const quizIsComplete = activeQuestionIndex === quiz?.question.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  const handleRandomizeQuiz = () => {
    let randomizedQuestions = [...questions];
    for (let i = randomizedQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedQuestions[i], randomizedQuestions[j]] = [randomizedQuestions[j], randomizedQuestions[i]];
    }
    setQuestions(randomizedQuestions);
  };

  useEffect(() => {
    if (userAnswers[activeQuestionIndex - 1]?.isCorrect) {
      setScore((score) => score + 1);
    }
  }, [userAnswers, activeQuestionIndex]);

  const handleTimerFinish = () => {
    setTimerFinished(true);
  };

  if (isQuizResolved) {
    const resolvedOn = Object.values(userData?.score).find(el => el.id === id).resolvedOn
    const scorePoints = Object.values(userData?.score).find(el => el.id === id).score
    return <QuizResolved id={id} score={scorePoints} title={quiz?.title} category={quiz?.category} userAnswers={userAnswers} resolvedOn={resolvedOn} />
  }

  if (quizIsComplete || timerFinished) {
    const scorePoints = Math.ceil(score / quiz?.question.length * quiz?.maxPassingPoints)
    updateUserScore(userData.username, id, quiz?.title, scorePoints, quiz?.category, userAnswers)
      .then(() => console.log('Quiz result saved successfully'))
      .catch((e) => toast.error(e));

    removeFromAssignments(userData.username, id)
      .then(() => console.log('Quiz assignment updated successfully'))
      .catch((e) => toast.error(e));

    removeAssignmentsFromQuiz(userData.username, id)
      .then(() => console.log('Quiz assignment updated successfully'))
      .catch((e) => toast.error(e));

    removeAssignmentsFromUser(userData.username, id)
      .then(() => console.log('Quiz assignment updated successfully'))
      .catch((e) => toast.error(e));
  }

  return (
    <>
      {quiz && <div className="flex flex-col overflow-auto h-screen items-center justify-center">
        <div className="text-center md:pb-8 mt-20">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 pr-2 pt-6" data-aos="zoom-y-out">
            <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">{quiz?.title}</span>
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-10 text-center" data-aos="zoom-y-out" data-aos-delay="150">
            Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
          </p>
        </div>
        <div className="flex xl:space-x-96 lg:space-x-28 sm:space-x-24">
          <div className="">
            <button onClick={handleRandomizeQuiz}>
              <img className="h-7 w-7 mix-blend-multiply" src={dice} alt="{dice}" />
              <span className="group-hover:text-gray-700">Randomize quiz</span>
            </button>
          </div>
          <p className="pt-7">Maximum points available - 100</p>
        </div>
        <div id="quiz" className="flex flex-col p-10 mb-20 bg-gradient-to-r from-indigo-400 rounded-lg w-full md:w-3/4 lg:w-2/3 shadow-xl mx-auto">
          <div className="mb">
            <div className="w-20 h-20 pt-4 pl-2 border-2 border-amber-300 rounded-full">
              <Timer onTimerFinish={handleTimerFinish} timeLimit={quiz?.timeLimit}></Timer>
            </div>
          </div>
          <div id="question" className="text-center mt-10">
            <h2 className="mb-20 font-medium text-2xl">{questions[activeQuestionIndex]?.question}</h2>
            <ul id="answers" className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
              {questions[activeQuestionIndex]?.answers.map((answer) => (
                <div key={answer.text} className="">
                  <button className="border-2 border-indigo-500 px-4 py-2 rounded-lg w-full text-center bg-gray-200 hover:bg-green-500"
                    onClick={() => handleSelectAnswer(answer)}>
                    {answer.text}
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>}
    </>
  )

}

export default SingleQuizView
