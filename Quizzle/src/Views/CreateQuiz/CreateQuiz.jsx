import { useState, useEffect } from "react";
import {
  addQuiz,
  createCategory,
  createQuestion,
  quizzesRef,
} from "../../services/quiz.services";

import { onValue } from "firebase/database";
const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contestType, setContestType] = useState("open");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState([
    { question: "", answers: [{ text: "", isCorrect: false }] },
  ]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    onValue(quizzesRef, (snapshot) => {
      const categories = [];
      snapshot.forEach((doc) => {
        const data = doc.val();
        if (!categories.includes(data.category)) {
          console.log(data);
          categories.push(data.category);
        }
      });
      setCategories(categories);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (categories.includes(category)) {
      alert("Category already exists!");
      return;
    }

    const quizData = {
      title,
      category,
      contestType,
      invitedUsers,
      timeLimit,
      questions: questions.map((question) => ({
        ...question,
        answers: question.answers.map((answer) => {
          if (answer) {
            return {
              text: answer.text,
              isCorrect: answer.isCorrect || false,
            };
          } else {
            return {
              text: "",
              isCorrect: false,
            };
          }
        }),
      })),
    };

    addQuiz(
      quizData.title,
      quizData.contestType,
      quizData.invitedUsers,
      quizData.timeLimit
    );

    createCategory(quizData.category);

    createQuestion(quizData.questions)
      .then(() => {
        setTitle("");
        setCategory("");
        setContestType("open");
        setInvitedUsers([]);
        setTimeLimit(30);
        setQuestions([
          { question: "", answers: [{ text: "", isCorrect: false }] },
        ]);
      })
      .then(() => {
        alert("Successfully created quiz!");
      })

      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ml-14 mt-[2px] p-10 rounded-lg border-8 bg-gradient-to-r from-gray-400 via-zinc-300 to-indigo-400 space-y-4"
    >
      <label className="block">
        <span className="text-white text-lg font-extralight">Title:</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full p-2 rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </label>
      <label className="block">
        <span className="text-white text-lg font-extralight">Category:</span>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full p-2 rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </label>
      <label className="block">
        <span className="text-white text-lg font-extralight">
          Contest Type:
        </span>
        <select
          onChange={(e) => setContestType(e.target.value)}
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        >
          <option value="open">Open Contest</option>
          <option value="invitational">Invitational Contest</option>
        </select>
      </label>
      {contestType === "invitational" && (
        <input
          type="text"
          placeholder="Invited Users"
          onChange={(e) => setInvitedUsers(e.target.value.split(","))}
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        />
      )}
      <label className="block">
        <span className="text-white text-lg font-extralight">
          Time Limit:
        </span>
        <input
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          required
          className="mt-1 block w-full p-2 rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </label>
      {questions.map((question, index) => (
        <div key={index} className="space-y-4">
          <label className="block">
            <span className="text-white text-lg font-extralight">
              Question:
            </span>
            <input
              type="text"
              value={question.question}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].question = e.target.value;
                setQuestions(newQuestions);
              }}
              required
              className="mt-1 block w-full p-2 rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label className="block">
                <span className="text-white text-lg font-extralight">
                  Answer:
                </span>
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].answers[answerIndex].text =
                      e.target.value;
                    setQuestions(newQuestions);
                  }}
                  required
                  className="mt-1 block w-full p-2 rounded-md bg-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setQuestions((prevQuestions) => {
                const newQuestions = [...prevQuestions];
                newQuestions[index].answers.push({
                  text: "",
                  isCorrect: false,
                });
                return newQuestions;
              });
            }}
            className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transform transition duration-500 ease-in-out hover:scale-105"
          >
            Add Answer
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setQuestions((prevQuestions) => [
            ...prevQuestions,
            { question: "", answers: [{ text: "", isCorrect: false }] },
          ]);
        }}
        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transform transition duration-500 ease-in-out hover:scale-105"
      >
        Add Question
      </button>
      <button
        type="submit"
        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-500 float-right transform transition duration-500 ease-in-out hover:scale-105 backdrop-filter backdrop-blur-lg bg-opacity-80"
      >
        Create Quiz
      </button>
    </form>
  );
};

export default CreateQuiz;
