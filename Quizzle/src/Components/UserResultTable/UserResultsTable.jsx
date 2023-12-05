import { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { dateFormat } from "../../common/helpers";
import SortButton from "../SortButton/SortButton";

const UserResultsTable = () => {
  const { userData } = useContext(AuthContext)
  const [ranking, setRanking] = useState(true)

  if (userData?.score) {
    const userResults = Object.values(userData?.score);
    userResults ? (userResults).sort((a, b) => b.score - a.score) : [];

    ranking ? userResults : userResults.reverse();
    const toggleRanking = () => {
      setRanking((prevRanking) => !prevRanking);
    };

    return (
      <div className="h-screen pb-20 overflow-auto p-5">
        <div className="ml-20 text-4xl animate-fade-in font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-zinc-500">
          <p className="mt-10">Take a look at your results.</p>
        </div>
        {userData && (
          <div className="mt-20 justify-center items-center border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400">
            <h1 className="mb-5 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-stone-100">
              Results
            </h1>
             {/* <div className="flex items-center justify-end">
              <SortButton onClick={toggleRanking} />
            </div> */}
            <table className="table-auto rounded w-full text-center text-white">
              <thead className="text-lg bg-indigo-400">
                <tr className="border border-violet-200 ">
                <th className="px-4 py-2"><SortButton onClick={toggleRanking} /></th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Your score</th>
                  <th className="px-4 py-2">Max score</th>
                  <th className="px-4 py-2">Passing score</th>
                  <th className="px-4 py-2">Resolved on</th>
                </tr>
              </thead>
              <tbody>
                {userResults.map((quiz) => (
                  <tr key={quiz.id} className="border bg-indigo-300 ">
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">{quiz.title}</td>
                    <td className="px-4 py-2">{quiz.category}</td>
                    <td className="px-4 py-2">{quiz.score}</td>
                    <td className="px-4 py-2">{quiz.maxPassingPoints}</td>
                    <td className="px-4 py-2">{quiz.minPassingPoints}</td>
                    <td className="px-4 py-2">{dateFormat(quiz.resolvedOn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
export default UserResultsTable
