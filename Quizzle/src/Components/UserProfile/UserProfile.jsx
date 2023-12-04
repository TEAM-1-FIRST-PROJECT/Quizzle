import { useContext, useEffect, useState } from 'react';
import SingleCard from '../SingleQuizCard/SingleQuizCard';
import { AuthContext } from '../../context/authContext';
import { getAllQuizzes } from '../../services/quiz.services';
import toast from 'react-hot-toast';


const UserProfile = () => {
    const { userData } = useContext(AuthContext);
    const userQuizzes = userData?.assignedQuizzes ? Object.keys(userData?.assignedQuizzes) : 'unlimited'
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        getAllQuizzes()
            .then(allQuizzes => {
                if (userQuizzes !== 'unlimited') {
                    const filteredQuizzes = allQuizzes.filter(quiz => userQuizzes.includes(quiz.id));
                    setQuizzes(filteredQuizzes);
                } else {
                    setQuizzes(allQuizzes);
                }
            })
            .catch(e => toast.error(e));
    }, [userQuizzes]);

    const f = (ob) => {
        let finalDate = Object.values(ob).map(arr => arr[1]);
        return Math.max(...finalDate);
    }

    const dateNow = Date.now();
    const ongoingQuizzes = quizzes.filter(quiz => quiz.assignedUsers !== undefined && f(quiz.assignedUsers) > dateNow);
    const closedQuizzes = quizzes.filter(quiz => quiz.assignedUsers !== undefined && f(quiz.assignedUsers) <= dateNow);

    return (
        <div className=" flex flex-col items-center">
        <section className="bg-gray-2 pb-10 pt-5 dark:bg-dark lg:pb-10 lg:pt-10">
            <div className="container">
                <h2 className='mt-12 text-3xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4'>Ongoing Quizzes</h2>
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {ongoingQuizzes.map(quiz => (
                <div key={quiz.id}><SingleCard
                  image="https://i.ibb.co/r2zns1m/image-01.jpg"
                  titleHref="/#"
                  btnHref="/#"
                  Button="View Details"
                  quiz={quiz}
                /></div>
              ))}
                </div>
                <h2 className='mt-12 text-3xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4'>Closed Quizzes</h2>
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {closedQuizzes.map(quiz => (
                <div key={quiz.id}><SingleCard
                  image="https://i.ibb.co/r2zns1m/image-01.jpg"
                  titleHref="/#"
                  btnHref="/#"
                  Button="View Details"
                  quiz={quiz}
                /></div>
              ))}
                </div>
            </div>
        </section>
    </div>
    );
}

export default UserProfile;