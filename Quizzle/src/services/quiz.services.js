import { equalTo, get, orderByChild, push, query, ref } from "firebase/database";
import { database } from "../config/firebase-config";

export const addQuiz = (title, contestType, invitedUsers, timeLimit) => {

    return push(
      ref(database, 'quizzes'),
      {
        title, contestType, invitedUsers, timeLimit
      },
     )
      .catch((error) => {
        console.log(error);
      });
  };
  
export const quizzesRef = ref(database, "quizzes");


export const createCategory = (category) => {
    return push(ref(database, "categories"), {category})
        .catch((error) => {
            console.log(error);
        });
};

export const createQuestion = (question) => { 
    return push(ref(database, "questions"), {question})
        .catch((error) => {
            console.log(error);
        });
}
