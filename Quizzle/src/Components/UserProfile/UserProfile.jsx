import { useState, useEffect, useContext } from 'react';    
import { getUserData } from '../../services/users.services';
import { getQuizById } from '../../services/quiz.services';
import SingleCard from '../SingleQuizCard/SingleQuizCard';
import { AuthContext } from '../../context/authContext';


const UserProfile = () => {
    const { userData } = useContext(AuthContext);
    const username = userData?.username;


    const [userQuizzes, setUserQuizzes] = useState([]);

    useEffect(() => {
        if (username) {
          getUserData(username)
            .then(userData => {
              const assignedQuizzes = userData.assignedQuizzes || [];
              console.log(assignedQuizzes); // log the assigned quizzes
      
              Promise.all(assignedQuizzes.map(quizId => getQuizById(quizId)))
                .then(quizzes => {
                  console.log(quizzes); // log the quizzes
                  setUserQuizzes(quizzes);
                })
                .catch(e => console.error(e));
            })
            .catch(e => console.error(e));
        }
      }, [username]);

    return (
        <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-col items-center">
            {userQuizzes.map(quiz => (
                <SingleCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
}

export default UserProfile;