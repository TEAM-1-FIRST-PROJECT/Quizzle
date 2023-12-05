import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users.services";
import { quizAssignments, getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";

const AssignQuiz = () => {

  const { id } = useParams();
  const [date, setDate] = useState('');
  const [finalDate, setFinalDate] = useState('')
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(snapshot => {
        setUsers(Object.values(snapshot.val()))
      })
      .catch(e => toast.error(e));
  }, []);

  useEffect(() => {
    getQuizById(id)
      .then(snapshot => {
        snapshot.assignedUsers ?
          setAssignedUsers(Object.keys(snapshot.assignedUsers))
          : assignedUsers
      })
      .catch(e => toast.error(e));
  }, [id, assignedUsers]);

  const assignQuizHandler = (user) => {

    const chosenDate = new Date(date);
    const dateInSeconds = chosenDate.getTime();
    const chosenFinalDate = new Date(finalDate);
    const finalDateInSeconds = chosenFinalDate.getTime();
    if (dateInSeconds === '' || finalDateInSeconds === '') {
      alert('date and finalDate can\'t be empty');
      return;
    }

    if (!dateInSeconds) {
      alert('date and finalDate cant\'be empty');
    }
    if (!finalDateInSeconds) {
      alert('date and finalDate cant\'be empty');
    }

    quizAssignments(user, id, dateInSeconds, finalDateInSeconds)
      .then(() => {
        console.log('quiz assigned successfully')
      })
      .catch(e => console.error(e));
  }

  return (
    <>
      {users && <div className="ml-2 mt-6">
        <section className="bg-white dark:bg-white py-3 sm:py-5">
          <div className="px-4  max-w-screen-2xl lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-indigo-300 opacity-80 sm:rounded-lg mb-20">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">UserName</th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">Last name</th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white"></th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">Points</th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">Max possible points</th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">Assign quiz</th>
                    </tr>
                  </thead>
                  <tr className="border-b dark:border-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-200">
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td ></td>
                    <td className="pr-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      open from <input
                        type="date"
                        placeholder="date"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      closed on <input
                        type="date"
                        onChange={(e) => setFinalDate(e.target.value)}
                      />
                    </td>
                  </tr>
                  {users.map(user => (

                    <tbody key={user.uid}>
                      <tr className="border-b dark:border-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-200">
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</td>
                        <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.lastName}
                        </th>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.score ? Object.values(user?.score).find(item => item.id === `${id}`)
                            ? Object.values(user?.score).find(item => item.id === `${id}`).score : 0 : 0
                          }</td>

                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">100</td>
                        <td className="px-4 py-2 text-yellow-400">
                          {assignedUsers.length > 0
                            ? assignedUsers.includes(user.username)
                              ? <button >Assigned</button>
                              : !user?.score ? <button onClick={() => assignQuizHandler(user.username)}>Assign</button> :
                                Object.values(user.score).map((quiz) => quiz.id).includes(id)
                                  ? <button >Resolved</button>
                                  : <button onClick={() => assignQuizHandler(user.username)}>Assign</button>
                            : !user?.score ? <button onClick={() => assignQuizHandler(user.username)}>Assign</button> :
                              Object.values(user.score).map((quiz) => quiz.id).includes(id)
                                ? <button >Resolved</button>
                                : <button onClick={() => assignQuizHandler(user.username)}>Assign</button>}
                        </td>
                        {/* <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{33}</td> */}
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                <span className="text-sm font-normal text-white dark:text-white">
                  Showing
                  <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                  of
                  <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                  <li>
                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-indigo-600 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-200 dark:hover:text-white">
                      <span className="sr-only">Previous</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-indigo-700 dark:bg-indigo-600 dark:text-white">1</a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-indigo-600 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-200 dark:hover:text-white">2</a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-indigo-600 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-200 dark:hover:text-white">3</a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-indigo-600 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-200 dark:hover:text-white">...</a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-indigo-600 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-200 dark:hover:text-white">100</a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-indigo-600 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-200 dark:hover:text-white">
                      <span className="sr-only">Next</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section></div>}
      {/* <div className="m-20 justify-center items-center border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400 to-cyan-400">
        <h1 className="mb-5 text-3xl text-white">Quiz </h1>
        <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
          <thead className=" text-lg"><tr>
            <td ></td>
            <td ></td>
            <td ></td>
            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-right">
              open from <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </td>
            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-right">
              closed on <input
                type="date"
                onChange={(e) => setFinalDate(e.target.value)}
              />
            </td>
          </tr>
            <tr>
              <th className="border px-4 py-2">USER</th>
              <th className="border px-4 py-2">LAST NAME</th>
              <th className="border px-4 py-2">POINTS</th>
              <th className="border px-4 py-2">MAX POSSIBLE POINTS</th>
              <th className="border px-4 py-2">ASSIGN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">username</td>
              <td className="border px-4 py-2">title</td>
              <td className="border px-4 py-2">score</td>
              <td className="border px-4 py-2">100</td>
              <td className="border px-4 py-2">
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>
  )
}

export default AssignQuiz
