import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import { database } from "../config/firebase-config";

export const addQuiz = (
  title,
  contestType,
  invitedUsers,
  timeLimit,
  category,
  question
) => {
  let newQuizRef = push(ref(database, "quizzes"));
  let quizData = {
    id: newQuizRef.key,
    category,
    title,
    contestType,
    invitedUsers,
    timeLimit,
    questions: { ...question },
  };

  // Add quiz to the quizzes collection
  return set(newQuizRef, quizData)
    .then(() => {
      // Add quiz id to the categories collection
      let categoryRef = ref(database, `categories/${category}`);
      return get(categoryRef).then((snapshot) => {
        if (snapshot.exists()) {
          // If category exists, append quiz id to the list
          let existingQuizzes = snapshot.val();
          existingQuizzes[newQuizRef.key] = true;
          return set(categoryRef, existingQuizzes);
        } else {
          // If category does not exist, create a new one with the quiz id
          return set(categoryRef, { [newQuizRef.key]: true });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const quizzesRef = ref(database, "quizzes");
