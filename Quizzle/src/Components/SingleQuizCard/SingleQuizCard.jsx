import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const SingleCard = ({
  image,
  Button,
  titleHref,
  btnHref,
  quiz
}) => {

  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {quiz?.title}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            Question 1 ..........
          </p>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            Question 2 ..........
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
          <Link to={`/singleQuizView/${quiz?.id}`}>Attempt Quiz</Link>

        </div>
      </div>
      {/*  */}
    </>
  );
};

SingleCard.propTypes = {
  image: PropTypes.string.isRequired,
  Button: PropTypes.element.isRequired,
  CardDescription: PropTypes.string.isRequired,
  CardTitle: PropTypes.string.isRequired,
  titleHref: PropTypes.string.isRequired,
  btnHref: PropTypes.string.isRequired,
  quiz: PropTypes.object.isRequired,
};

export default SingleCard;