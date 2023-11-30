import { useContext } from 'react';    
import SingleCard from '../SingleQuizCard/SingleQuizCard';
import { AuthContext } from '../../context/authContext';


const UserProfile = () => {
    const { userData } = useContext(AuthContext);
    const userQuizzes =  userData?.assignedQuizzes ? Object.keys(userData?.assignedQuizzes) : 'unlimited'

    return (
        <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-col items-center">
            {userQuizzes.map(quiz => (
                <SingleCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
}

export default UserProfile;