import { useParams } from "react-router-dom";

const SingleQuizView = () => {
  const { id } = useParams();
  console.log(id)
  return (
    <div>
      single Quizzz
    </div>
  )
}

export default SingleQuizView
