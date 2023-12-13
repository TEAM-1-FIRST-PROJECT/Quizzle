import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import bioImage from '../../assets/bio.jpg';
import itImage from '../../assets/IT.jpg';
import mathImage from '../../assets/math.jpg';
import historyImage from '../../assets/History.jpg';
import quizImage from '../../assets/quiz.jpg';
import { CATEGORIES } from "../../common/constants";
import { useState, useEffect } from "react";
import it1 from '../../assets/it1.jpg';
import biology1 from '../../assets/biology1.jpg';
import history1 from '../../assets/history1.jpg';
import math1 from '../../assets/math1.jpg';
import base1 from '../../assets/base1.jpg';
import astronomy1 from '../../assets/astronomy1.jpg';

const SingleCategoryCard = ({ image, category, quizzesInCategory }) => {

const [img, setImg] = useState('');

useEffect(() => {
  // Use a separate function to set the image source based on quiz category
  const setImageSrc = () => {
    switch (category) {
      case CATEGORIES.IT:
        setImg(it1);
        break;
      case CATEGORIES.BIOLOGY:
        setImg(biology1);
        break;
      case CATEGORIES.MATHEMATICS:
        setImg(math1);
        break;
        case CATEGORIES.HISTORY:
        setImg(history1);
        break;
      default:

        setImg(base1);
    }
  };

  // Call the function to set the image source
  setImageSrc();
}, [category]);
    return (
      <>
        <div className="mb-10 overflow-hidden rounded-lg bg-white dark:bg-gradient-to-br dark:from-slate-400 dark:to-zinc-500 shadow-lg duration-300 hover:drop-shadow-lg">
          <img src={img} alt="" className="w-full h-72" />
          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
            <h3>
              <a
                className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-zinc-100 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
              >
                {category}
              </a>
            </h3>
            <p className="mb-7 text-base leading-relaxed text-body-color dark:text-zinc-100">
            See all {quizzesInCategory} quizzes in this category
          </p>
            <Link to={`/categories/${category}`}
            className="inline-block px-4 py-2 bg-violet-300 rounded-lg text-center font-medium transform transition duration-500 ease-in-out hover:scale-105 hover:bg-violet-500 hover:text-zinc-100 dark:bg-indigo-600"
            >View Quizzes
            </Link>
          </div>
        </div>
      </>
    );
  };
  
  SingleCategoryCard.propTypes = {
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };
  
  export default SingleCategoryCard;