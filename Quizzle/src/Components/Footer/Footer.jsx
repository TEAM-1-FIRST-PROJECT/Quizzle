import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 left-0 z-10 w-full p-4 bg-gradient-to-r from-violet-400 to-indigo-400 shadow md:flex md:items-center md:justify-between md:p-2 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-white sm:text-center dark:text-white">
        Copyright &copy; 2023 by {" "}
          <a href="http://localhost:5173/" className="hover:underline">
            Quizzle™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underlin mr-10">
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
