import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";
import { getUserByHandle } from "../../services/users.services";


const UserAnswers = () => {

  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [user, setUser] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');
  const [quizId, username] = id.split('--');

  useEffect(() => {
    getQuizById(quizId)
      .then((fetchedQuiz) => {
        setQuiz(fetchedQuiz);
      })
      .catch((error) => {
        toast.error("Error fetching quiz details:", error);
        setQuiz(null);
      });

    getUserByHandle(username)
      .then((user) => {
        setUser(user.val());
      })
      .catch((error) => {
        toast.error("Error fetching quiz details:", error);
        setUser(null);
      });
  }, [quizId, username]);

  const AddCommentHandler = () => {
    setShowInput(!showInput);
  }
  const saveComment = (user, quiz, i) => {
    console.log(comment, user, quiz, i)
    console.log()
  }
  //showInput ?  : console.log('close')
  return (
    <>
      {quiz && <div className="h-screen bg-hero-pattern-2 bg-cover flex items-center justify-center">
        <div className="max-w-40rem mx-auto my-8 p-8 pt-10 bg-indigo-100 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom">
          <p className="text-lg">{quiz?.title}</p>
          <p className="text-lg">{quiz.category}</p>
          {quiz.question.map((quest, i) => (
            <div key={i}>
              <button className="border border-solid border-indigo-300 relative p-2"
                onClick={AddCommentHandler}>
                <p className="absolute top-0 right-0 m-1 px-1 text-sm">add comment</p>
                <p className="block text-lg">{quest.question}</p>
                <p className="block text-left">correct answer:{quest.answers.find(item => item.isCorrect === true)
                  ? quest.answers.find(item => item.isCorrect === true).text
                  : null}</p>
                <p className="block text-left">your answer:    {user?.score[quiz?.title].userAnswers[i].text}</p><p>{i}</p>
              </button>
              {showInput && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded">
                    
                    <input
                      type="text"
                      placeholder={i}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button onClick={() => { setComment(''); setShowInput(false); saveComment(user.username, quiz?.title, i) }}>Save comment</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>}
    </>
  )
}

export default UserAnswers
