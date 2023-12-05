
import loadingImg from '../../assets/Loading.gif'
const Loader = () => (
  <div className="flex items-center justify-center ">
    <span className='text-5xl text-center mt-32'>
      Loading ..
      
   <img src={loadingImg} alt="" />
    </span>
  </div>
);

export default Loader;
