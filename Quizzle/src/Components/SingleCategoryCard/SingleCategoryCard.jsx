import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const SingleCategoryCard = ({ image, category }) => {
    return (
      <>
        <div className="mb-10 overflow-hidden rounded-lg bg-white dark:bg-gradient-to-br dark:from-slate-400 dark:to-zinc-500 shadow-lg duration-300 hover:drop-shadow-lg">
          <img src={image} alt="" className="w-full h-36" />
          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
            <h3>
              <a
                className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-zinc-100 sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
              >
                {category}
              </a>
            </h3>
            <p className="mb-7 text-base leading-relaxed text-body-color dark:text-zinc-100">
            See all {category.length} quizzes in this category
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