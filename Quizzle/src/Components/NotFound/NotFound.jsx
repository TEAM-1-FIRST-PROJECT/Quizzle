import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/austronaut.png";
import moon from "../../assets/moon.png";

const NotFound = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const stars = Array.from({ length: 1000 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random(),
      speed: Math.random() * 3,
    }));

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="h-screen overflow-auto  relative">
      <div className=" h-screen pt-1">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="flex flex-col text-white dark:text-zinc-300 mt-32 items-center justify-center space-y-8 z-10 relative">
          <h1 className="text-yellow-200 text-5xl">
            Houston, we have a problem.
          </h1>
          <h2 className="text-red-500 text-2xl pt-10">404</h2>
          <h3 className="text-5xl">Page not found</h3>
          <div className="pt-20">
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-gradient-to-l hover:from-blue-400 text-white font-bold py-2 px-4 mr-10 rounded bg-gradient-to-r from-sky-400 dark:from-sky-400"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:bg-gradient-to-r hover:from-blue-400 text-white font-bold py-2 px-4 rounded bg-gradient-to-l from-blue-400 dark:from-blue-400"
            >
              Go To Home
            </button>
          </div>
        </div>
        <div className="absolute top-1/4 left-20 animate-astronaut">
          <img className="h-32 w-32" src={img} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-moon-spin">
          <img className="h-32 w-32" src={moon} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
