import toast from "react-hot-toast";
import { getAllCategories } from "../../services/quiz.services";
import SingleCategoryCard from "../SingleCategoryCard/SingleCategoryCard";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    getAllCategories()
      .then((snapshot) => {
        setCategories(snapshot);
      })
      .catch((e) => toast.error(e));
  }, []);

  return (
    <div className="h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 rounded-lg">
        <div className=" md:pt-10 text-center">
          <div className=" text-center pb-5 md:pb-5">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter text-black tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Quizzle{" "}
              <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">
                Categories
              </span>
            </h1>
          </div>
        </div>
      </div>
      {/* Section with Cards */}
      <section className="flex flex-col bg-gray-2 m-10 dark:bg-dark lg:pb-10 lg:pt-10">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <div key={index}>
                <SingleCategoryCard
                  image="https://i.ibb.co/r2zns1m/image-01.jpg"
                  titleHref="/#"
                  btnHref="/#"
                  Button="View Details"
                  category={category}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
