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

    // Add quiz to the quizzes collection
    return set(newQuizRef, quizData)
        .then(() => {
            // Add quiz id to the categories collection
            let newCategoryRef = ref(database, `categories/${category}`);
            return set(newCategoryRef, newQuizRef.key);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const quizzesRef = ref(database, "quizzes");

const fromQuizDocument = snapshot => {
    const quizDocument = snapshot.val();
  
    return Object.keys(quizDocument).map(key => {
      const quiz = quizDocument[key];
  
      return {
        ...quiz,
        id: key,
        createdOn: new Date(quiz.createdOn),
        likedBy: quiz.likedBy ? Object.keys(quiz.likedBy) : [],
      };
    });
  }
export const getAllQuizzes = () => {

    return get(ref(database, 'quizzes'))
      .then(snapshot => {
        if (!snapshot.exists()) {
          return [];
        }
  
        return fromQuizDocument(snapshot);
      });
  };

  export const getQuizById = (id) => {

    return get(ref(database, `quizzes/${id}`))
      .then(result => {
        if (!result.exists()) {
          throw new Error(`Quiz with id ${id} does not exist!`);
        }
  
        const quiz = result.val();
        quiz.id = id;
        quiz.createdOn = new Date(quiz.createdOn);
        if (!quiz.likedBy) quiz.likedBy = [];
  
        return quiz;
      });
  };