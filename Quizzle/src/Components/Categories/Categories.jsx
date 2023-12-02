import toast from "react-hot-toast";
import { getAllCategories } from "../../services/quiz.services";
import SingleCategoryCard from "../SingleCategoryCard/SingleCategoryCard";
import { useEffect, useState } from "react";

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(() => {
      getAllCategories()
        .then(snapshot => {
          setCategories(snapshot)
  
        })
        .catch(e => toast.error(e));
    }, []);

  return (
      <div>
        <div className="min-h-screen bg-black bg-cover flex flex-col items-center ml-[250px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 rounded-lg">
          <div className="pt-32 md:pt-10 ">
            <div className=" text-center pb-12 md:pb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter text-white tracking-tighter mb-4" data-aos="zoom-y-out">
                Welcome to <span className="bg-clip-text p-1 text-transparent bg-gradient-to-r from-blue-600 to-violet-400">Quizzle</span>
              </h1>
            </div>
          </div>
        </div>
        {/* Section with Cards */}
        <section className="bg-gray-2 pb-10 pt-5 dark:bg-dark lg:pb-10 lg:pt-10">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <div key={index}><SingleCategoryCard
                  image="https://i.ibb.co/r2zns1m/image-01.jpg"
                  titleHref="/#"
                  btnHref="/#"
                  Button="View Details"
                  category={category}
                /></div>
              ))}
            </div>
          </div>
        </section>
      </div>
      </div>
    )
}

export default Categories;