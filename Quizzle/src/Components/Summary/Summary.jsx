const Summary = (scorePoints) => {
  return (
    <div className="max-w-40rem mx-auto my-8 p-8 bg-green-300 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom flex flex-col items-center">
        <h2>Quiz Completed!</h2>
        <h2>You score {scorePoints.value}</h2>
      </div>
  )
}

export default Summary
