import { get } from "firebase/database";
import { quizzesRef } from "../services/quiz.services";

export const dateFormat = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);

  return `${day}/${month}/${year}`;
};

export const titleCheck = (title) => {
  get(quizzesRef).then((snapshot) => {
    let quizzes = snapshot.val();
    for (let key in quizzes) {
      if (quizzes[key].title === title) {
        alert("Quiz with the same title already exists!");
        return;
      }
    }
  });
};

export const totalScore = arr => arr.reduce((sum, item) => sum + item.score, 0);
export const timeLimitInSeconds = (timeLimit) => timeLimit * 60;
