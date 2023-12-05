
import loadingImg from '../../assets/Loading.gif'
const Loader = () => (
  <div className="flex items-center justify-center ">
    <span className='text-6xl text-center mt-32'>
      <p className='p-4'>Loading ...</p>
      
   <img src={loadingImg} alt="" />
    </span>
  </div>
);

export default Loader;
