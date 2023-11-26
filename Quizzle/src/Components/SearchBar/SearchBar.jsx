import { useEffect, useState } from "react";
import { getAllQuizzes } from "../../services/quiz.services";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllQuizzes().then(setQuizzes);
      }, []);

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      
        if (event.target.value.length > 0) {
          const filteredQuizzes = quizzes.filter((quiz) =>
            quiz.title && quiz.title.toLowerCase().includes(event.target.value.toLowerCase())
          );
          setResults(filteredQuizzes); 
        } else {
          setResults([]);
        }
      };

      const handleUserClick = (title) => {
        const quiz = quizzes.find(quiz => quiz.title === title);
        setSelectedQuiz(quiz);
        navigate(`/singleQuizView/${quiz.id}`);
      };

      return (
        <div className="relative flex items-center">
          <input
            className="rounded-full p-1.5 border-2 border-indigo-700 focus:outline-none hover:shadow-inner hover:shoadow-sm w-full bg-indigo opacity-80"
            type="search"
            placeholder="Search..."
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchChange}
            required
          />
          {results.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-max">
              {results.map((quiz, index) => (
                <div 
                  key={index} 
                  className="text-sm leading-5 text-gray-700 px-4 py-3 hover:bg-indigo-200 cursor-pointer" 
                  onClick={() => handleUserClick(quiz.title)}
                >
                  {quiz.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )
}

export default SearchBar;