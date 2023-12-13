import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { dateNow } from "../../common/constants";
import RemainingTime from "../RemainingTime/RemainingTime";
import { updateUserScore } from "../../services/users.services";
import {
  removeFromAssignments,
  removeAssignmentsFromQuiz,
  removeAssignmentsFromUser
} from "../../services/quiz.services";
import toast from "react-hot-toast";
import bioImage from '../../assets/bio.jpg';
import itImage from '../../assets/IT.jpg';
import mathImage from '../../assets/math.jpg';
import historyImage from '../../assets/History.jpg';
import quizImage from '../../assets/quiz.jpg';
import { CATEGORIES } from "../../common/constants";
import it1 from '../../assets/it1.jpg';
import biology1 from '../../assets/biology1.jpg';
import history1 from '../../assets/history1.jpg';
import math1 from '../../assets/math1.jpg';
import base1 from '../../assets/base1.jpg';
import astronomy1 from '../../assets/astronomy1.jpg';


const SingleCard = ({ quiz }) => {

  const { userData } = useContext(AuthContext)
  const [img, setImg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Use a separate function to set the image source based on quiz category
    const setImageSrc = () => {
      switch (quiz?.category) {
        case CATEGORIES.IT:
          setImg(it1);
          break;
        case CATEGORIES.BIOLOGY:
          setImg(biology1);
          break;
        case CATEGORIES.MATHEMATICS:
          setImg(math1);
          break;
        case CATEGORIES.HISTORY:
          setImg(history1);
          break;
        case CATEGORIES.ASTRONOMY:
          setImg(astronomy1);
          break;
        default:

          setImg(base1);
      }
    };

    // Call the function to set the image source
    setImageSrc();
  }, [quiz?.category]);

  const showTimer = userData?.assignedQuizzes ? Object.keys(userData?.assignedQuizzes).includes(quiz?.id) : false;
  let timeLimit = 0;
  let score = 0;
  if (showTimer) {
    timeLimit = Math.floor((userData?.assignedQuizzes[quiz?.id][1] - dateNow) / 1000)
  }
  const showScore = userData?.score ? Object.keys(userData?.score).includes(quiz?.title) : false;
  if (showScore) {
    score = userData?.score[quiz?.title].score
  }

  const rejectQuiz = () => {
    console.log('reject')
    updateUserScore(userData.username, quiz.id, quiz.title, score, quiz.category, [], quiz.maxPassingPoints, quiz.minPassingPoints)
      .then(() => {
        navigate(`/singleQuizView/${quiz?.id}`)
        console.log('Quiz result saved successfully')})
      .catch((e) => toast.error(e));

    removeFromAssignments(userData.username, quiz.id)
      .then(() => console.log('Quiz assignment updated successfully'))
      .catch((e) => toast.error(e));

    removeAssignmentsFromQuiz(userData.username, quiz.id)
      .then(() => console.log('Quiz assignment updated successfully'))
      .catch((e) => toast.error(e));

    removeAssignmentsFromUser(userData.username, quiz.id)
      .then(() => console.log('Quiz assignment updated successfully'))
      .catch((e) => toast.error(e));
  }

  const showSummary = userData?.score ? Object.keys(userData?.score).includes(quiz?.title) : false

  return (
    <>
      {quiz && <div className=" mb-10 overflow-hidden rounded-lg shadow-xl border-indigo-300">
        <div className="relative">
          <img src={img} alt="" className="h-80 w-full" />
          <div className="absolute top-0 right-0 z-10">
            {showTimer
              ? <RemainingTime
                timeLimit={timeLimit}
                username={userData?.username}
                id={quiz?.id}
                title={quiz?.title}
                score={0}
                category={quiz?.category} />
              : <div className="text-right mr-2 mt-2 text-lg">You score {score}</div>}
          </div>
        </div>
        <div className="text-center bg-white dark:bg-gradient-to-br dark:from-slate-400 dark:to-zinc-500 dark:text-zinc-100 opacity-90 pb-8">
          <h3>
            <Link
              to={`/singleQuizView/${quiz?.id}`}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
              {quiz?.title}
            </Link>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color ">
            {quiz?.description}
          </p>
          <p className="mb-7 text-base leading-relaxed text-body-color ">
            {`In this quiz you have ${quiz?.timeLimit} minutes to answer ${quiz?.question?.length} questions.`}
          </p>
          <div className="flex justify-center space-x-4">
            {!showSummary && <Link
              to={`/singleQuizView/${quiz?.id}`}
              className="inline-block mx-1 px-4 py-2 bg-violet-300  rounded-lg text-center font-medium transform transition duration-500 ease-in-out hover:scale-105 hover:bg-violet-500 hover:text-zinc-100 dark:text-black dark:hover:text-zinc-100 dark:bg-indigo-600"
            >
              Enroll quiz
            </Link>}

            {showTimer && <button
              className="inline-block mx-1 px-4 py-2 bg-violet-300 rounded-lg text-center font-medium transform transition duration-500 ease-in-out hover:scale-105 hover:bg-violet-500 hover:text-white dark:text-black dark:hover:text-zinc-100 dark:bg-indigo-600"
              onClick={rejectQuiz}
            >
              Reject Quiz
            </button>}
            {showSummary && <Link
              to={`/singleQuizView/${quiz?.id}`}
              className="inline-block mx-1 px-4 py-2 bg-violet-300 rounded-lg text-center font-medium transform transition duration-500 ease-in-out hover:scale-105 hover:bg-violet-500 hover:text-white dark:text-black dark:hover:text-zinc-100 dark:bg-indigo-600"
            >
              Summary
            </Link>}
            <Link
              to={`/singleQuizScoreboard/${quiz?.id}`}
              className="inline-block mx-1 px-4 py-2 bg-violet-300 rounded-lg text-center font-medium transform transition duration-500 ease-in-out hover:scale-105 hover:bg-violet-500 hover:text-white dark:text-black dark:hover:text-zinc-100 dark:bg-indigo-600"
            >
              View scoreboard
            </Link>
          </div>
        </div>
      </div>}
    </>
  )
};

SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  quiz: PropTypes.object.isRequired || undefined,
};

export default SingleCard;