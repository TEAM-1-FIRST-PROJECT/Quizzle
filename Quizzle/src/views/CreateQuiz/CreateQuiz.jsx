import { useState, useEffect, useContext } from "react";
import { addQuiz, quizzesRef } from "../../services/quiz.services";

import { onValue } from "firebase/database";
import { AuthContext } from "../../context/authContext";
import { titleCheck } from "../../common/helpers";
import toast from "react-hot-toast";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [contestType, setContestType] = useState("open");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [timeLimit, setTimeLimit] = useState(30);
  const [totalPoints, setTotalPoints] = useState(100);
  const [miniPassingPoints, setMiniPassingPoints] = useState(50);
  const [questions, setQuestions] = useState([
    { question: "", answers: [{ text: "", isCorrect: false }] },
  ]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const { userData } = useContext(AuthContext);
  const username = userData?.username;
  useEffect(() => {
    onValue(quizzesRef, (snapshot) => {
      const categories = [];
      snapshot.forEach((doc) => {
        const data = doc.val();
        if (!categories.includes(data.category)) {
          categories.push(data.category);
        }
      });
      setCategories(categories);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalCategory = newCategory ? newCategory : category;

    if (
      !/[A-Z][a-z]*$/.test(title.split(" ")[0]) ||
      !/[A-Z][a-z]*$/.test(finalCategory.split(" ")[0])
    ) {
      alert(
        "The first word of Title and Category must start with a capital letter followed by lowercase letters!"
      );
      return;
    }

    titleCheck(title);

    addQuiz(
      username,
      title,
      description,
      contestType,
      invitedUsers,
      timeLimit,
      finalCategory,
      questions,
      miniPassingPoints,
      totalPoints
    )
      .then(() => {
        setTitle("");
        setDescription("");
        setCategory("");
        setContestType("open");
        setInvitedUsers([]);
        setTimeLimit(30);
        setMiniPassingPoints(0);
        setQuestions([
          { question: "", answers: [{ text: "", isCorrect: false }] },
        ]);
      })
      .then(() => {
        alert("Successfully created quiz!");
      })
      .catch((error) => {
        toast.error("Error adding document: ", error);
      });
  };
  return (
    <div className=" grid grid-flow-row h-screen">
      <div className="mb-20">
        <div className=" text-center mt-10 ">
          <h1 className="text-6xl text-black dark:text-zinc-200 font-extrabold leading-tighter tracking-tighter mb-4 mt-10 pr-2">
            Create your own{" "}
            <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">
              Quiz
            </span>
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-gray-500 text-center">
            Our landing page template works on all devices, so you only have to
            set it up once, and get beautiful results forever.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="z-0 p-10 pb-10 m-32 mt-10  hover:shadow-2xl border-2 bg-indigo-300 dark:bg-zinc-500 space-y-4 rounded-lg "
        >
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Title:
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Description:
                </span>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Select Category:
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Create new category:
                </span>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                />
              </label>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Contest Type:
                </span>
                <select
                  onChange={(e) => setContestType(e.target.value)}
                  className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 dark:bg-zinc-400 dark:text-zinc-800"
                >
                  <option value="open">Open Contest</option>
                  <option value="invitational">Invitational Contest</option>
                </select>
              </label>
            </div>
          </div>
          {contestType === "invitational" && (
            <input
              type="text"
              placeholder="Invited Users"
              onChange={(e) => setInvitedUsers(e.target.value.split(","))}
              className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 dark:bg-zinc-400 dark:placeholder-orange-200"
            />
          )}
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Time Limit (in minutes)
                </span>
                <input
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                />
              </label>
            </div>

            <div className="w-full md:w-1/3 px-3">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Total Points:
                </span>
                <input
                  type="number"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                />
              </label>
            </div>

            <div className="w-full md:w-1/3 px-3">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
                  Minimum Passing Score:
                </span>
                <input
                  type="number"
                  value={miniPassingPoints}
                  onChange={(e) => setMiniPassingPoints(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                />
              </label>
            </div>
          </div>

          {questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <label className="block">
                <span className="text-gray-700 text-xl font-extralight">
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
                  className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                />
              </label>
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <label className="block">
                    <span className="text-gray-700 text-xl font-extralight">
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
                      className="mt-1 block w-full p-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-zinc-400 dark:text-zinc-800"
                    />
                  </label>
                  <label className="block">
                    <input
                      className="w-4 h-4 mr-2 mt-2 rounded transition duration-500 ease-in-out text-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      checked={answer.isCorrect}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].answers[answerIndex].isCorrect =
                          e.target.checked;
                        setQuestions(newQuestions);
                      }}
                    />
                    <span className="text-gray-700 font-bold">
                      Is this the correct answer?
                    </span>
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
                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 rounded-md hover:bg-violet-700 transform transition duration-500 ease-in-out hover:scale-105"
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
            className="mt-2 px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-md hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500 transform transition duration-500 ease-in-out hover:scale-105"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-green-500 float-right transform transition duration-500 ease-in-out hover:scale-105"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
