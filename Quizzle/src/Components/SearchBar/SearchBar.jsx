import { useEffect, useRef, useState } from "react";
import { getAllQuizzes } from "../../services/quiz.services";
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const navigate = useNavigate();

    const searchInputRef = useRef(null);
    const resultsDropdownRef = useRef(null);

    useEffect(() => {
        getAllQuizzes().then(setQuizzes);

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
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

      const handleClickOutside = (event) => {
        if (
          searchInputRef.current && !searchInputRef.current.contains(event.target) &&
          resultsDropdownRef.current && !resultsDropdownRef.current.contains(event.target)
        ) {
          setSelectedQuiz(null);
          setResults([]);
        }
      };

      return (
        <div className="flex items-center relative">
          <input
            ref={searchInputRef}
            className="rounded-full placeholder-orange-300 text-lg font-semibold p-1 border-2 border-indigo-700 dark:border-none focus:outline-none hover:shadow-inner hover:shoadow-sm w-full bg-indigo opacity-80"
            type="search"
            placeholder="Search..."
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchChange}
            required
          />
          {results.length > 0 && (
            <div ref={resultsDropdownRef}  className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-max">
              {results.map((quiz, index) => (
                <div 
                  key={index} 
                  className="text-lg font-semibold leading-5 text-gray-700 px-4 py-3 hover:bg-indigo-200 cursor-pointer" 
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