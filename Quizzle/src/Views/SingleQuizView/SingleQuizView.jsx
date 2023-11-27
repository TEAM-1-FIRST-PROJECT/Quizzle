import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import Timer from "../../components/Timer/Timer";
import Summary from "../../components/Summary/Summary";
import { AuthContext } from "../../context/authContext";
import QuizResolved from "../../components/QuizResolved/QuizResolved";
import  dice  from "../../assets/dice.gif";


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
        console.error("Error fetching quiz details:", error);
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
    return <QuizResolved score={scorePoints} resolvedOn={resolvedOn} />
  }

  if (quizIsComplete || timerFinished) {
    const scorePoints = Math.ceil(score / quiz?.question.length * 100)
    return <Summary id={id} score={scorePoints} title={quiz?.title} category={quiz?.category}></Summary>
  }

  return (
    <>
      <div className="h-screen bg-hero-pattern-2 bg-cover items-center">
        <div className=" text-center pb-12 md:pb-8 mt-20">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 pr-2 pt-6" data-aos="zoom-y-out">
            <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">{quiz?.title}</span>
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 mb-10 text-center" data-aos="zoom-y-out" data-aos-delay="150">
            Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
          </p>
        </div>
        <div id="quiz" className="ml-14 mt-[2px] p-10 border-indigo-700 border-2 bg-indigo-300 opacity-80 space-y-4 rounded-lg w-3/4 ml-60 h-4/">
          <Timer onTimerFinish={handleTimerFinish}></Timer>
          <div id="question" className="text-center">
          <h2 className="mx-auto mb-10 font-medium text-2xl">{questions[activeQuestionIndex]?.question}</h2>
            <ul id="answers" className="grid grid-cols-1 space-y-4 mx-auto">
              {questions[activeQuestionIndex]?.answers.map((answer) => (
                <div key={answer.text} className="mx-auto">
                  <button className="border-2 border-indigo-800 px-1 py-1 ml-34 rounded-lg place-content-stretch hover:bg-emerald-500"
                    onClick={() => handleSelectAnswer(answer)}>
                    {answer.text}
                  </button>
                </div>
              ))}
            </ul>
            <div className="flex flex-col items-end mt-80 mr-4">
            <div className="mb-4">
            <button onClick={handleRandomizeQuiz}>
                <img className="h-7 w-7 mix-blend-multiply" src={dice} alt="{dice}"/>
                <span className="group-hover:text-gray-700">Randomize quiz</span>
                </button>
            </div>
            <p className="bottom-0 right-0 mt-80 mr-4 text-right ">Maximum points available - 100</p>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleQuizView
