import { useNavigate } from 'react-router-dom';
import landingimg from '../assets/landingimg.png';

const Landing = () => {
  const navigate = useNavigate();

  const handleStartTracking = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-customColor-landingbackground w-full ">
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center pt-14">
        <h1 className="text-[35px] font-urbanist text-center text-customColor-landingverydark md:text-4xl font-extralight">
          CONDITION BASED MONITORING AND MAINTENANCE SYSTEM
        </h1>
        <h2 className=" text-base md:text-[25px] mt-5 font-urbanist text-center text-customColor-landingverydark font-light">
          Empowering Maintenance with Intelligence
        </h2>
        <button
          onClick={handleStartTracking}
          className="mt-5 px-5 py-2 text-[15px] font-urbanist bg-customColor-landingverydark hover:scale-125 hover:transition-transform duration-500 text-white rounded-3xl"
        >
          Start Tracking
        </button>
      </div>
      
      {/* Landing Image */}
      <div>
        <img
          src={landingimg}
          alt="landingimage"
          className="w-full h-[68vh]"
        />
      </div>
    </div>
  );
};

export default Landing;