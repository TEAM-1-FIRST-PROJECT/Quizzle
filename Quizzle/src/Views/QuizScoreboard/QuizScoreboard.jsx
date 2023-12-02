

const QuizScoreboard = () => {


  return (
    <div className="m-20 justify-center items-center border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400 to-cyan-400">
      <h1 className="mb-5 text-3xl text-white">Quizzes</h1>

      <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-green-400 float-right transform transition duration-500 ease-in-out hover:scale-105"
        onClick={() => { }}></button>
      <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
        <thead className=" text-lg">
          <tr>
            <th className="border px-4 py-2">Create By</th>
            <th className="border px-4 py-2">Quiz Title</th>
            <th className="border px-4 py-2">Created On</th>

            <th className="border px-4 py-2">Assign</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default QuizScoreboard
