import PropTypes from 'prop-types';
import { BiSortAlt2 } from "react-icons/bi";


const SortButton = ({ onClick }) => {
  return (
    <div>
    <button className="bg-white hover:bg-indigo-400 text-gray-800 text-sm font-semibold py-1 px-2 rounded inline-flex items-center" onClick={onClick}>
    <BiSortAlt2 />
    <span>Sort</span>
  </button>
    </div>
  )
}

SortButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SortButton;