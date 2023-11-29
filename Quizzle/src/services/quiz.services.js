import {
  get,
  push,
  ref,
  set,
  update,
  remove
} from "firebase/database";
import { database } from "../config/firebase-config";

export const addQuiz = (
  username,
  title,
  description,
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
    description,
    createdBy: username,
    contestType,
    invitedUsers,
    timeLimit,
    question,
    createdOn: Date.now(),
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

export const updateQuizData = (quizId, quiz) => {
  const pathQuestion = `quizzes/${quizId}`;
  return update(ref(database), {
    [pathQuestion]: quiz
  }).catch((error) => {
    console.error('Update failed:', error);
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

export const saveUserScore = (username, postId, score) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${username}`] = score;
  updateLikes[`/users/${username}/likedPosts/${postId}`] = score;

  return update(ref(database), updateLikes);
};

export const getAllCategories = () => {
  return get(ref(database, 'categories'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }

      const categoriesDocument = snapshot.val();
      return Object.keys(categoriesDocument);
    });
};

export const getQuizzesByCategory = (category) => {
  return getAllQuizzes()
    .then(quizzes => quizzes.filter(quiz => quiz.category === category));
}

export const quizAssignments = (user, id) => {
  const quizAssignment = {};
  quizAssignment[`/assignments/users/${user}/${id}`] = true;
  quizAssignment[`/quizzes/${id}/assignedUsers/${user}`] = true;

  return update(ref(database), quizAssignment);
}

export const removeFromAssignments = (user, id) => {
  
  return remove(ref(database, `/assignments/users/${user}/${id}`));
};
export const removeAssignmentsFromQuiz = (user, id) => {
  
  return remove(ref(database, `/quizzes/${id}/assignedUsers/${user}`));
};
