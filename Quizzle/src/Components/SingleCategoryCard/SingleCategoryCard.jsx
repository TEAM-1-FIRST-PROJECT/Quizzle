import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const SingleCategoryCard = ({ image, category }) => {
    return (
      <>
        <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-lg duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
          <img src={image} alt="" className="w-full" />
          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
            <h3>
              <a
                className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-black sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
              >
                {category}
              </a>
            </h3>
            <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            See all {category.length} quizzes in this category
          </p>
            <Link to={`/categories/${category}`}
            className="inline-block px-4 py-2 border bg-violet-300 border-violet-500 rounded-lg text-center font-medium hover:bg-violet-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
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