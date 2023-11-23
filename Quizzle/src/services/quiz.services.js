import { equalTo, get, orderByChild, push, query, ref, set } from "firebase/database";
import { database } from "../config/firebase-config";

export const addQuiz = (title, contestType, invitedUsers, timeLimit, category, question) => {
   
    let newQuizRef = push(ref(database, 'quizzes'));
    let quizData = {
        id: newQuizRef.key,
        category,
        title,
        contestType,
        invitedUsers,
        timeLimit,
        questions: { ...question }
    };

    return set(newQuizRef, quizData)
        .catch((error) => {
            console.log(error);
        });
};

export const quizzesRef = ref(database, "quizzes");
