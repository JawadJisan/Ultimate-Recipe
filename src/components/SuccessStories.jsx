import CountUp from "react-countup";

const SuccessStories = ({ recipeCount, userCount }) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Recipes Available</h3>
          <div className="text-6xl font-bold text-[#eb4a36]">
            <CountUp end={recipeCount} duration={10} />
          </div>
          <p className="text-gray-600 mt-4">
            Discover a wide variety of recipes to cook and enjoy.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Happy Users</h3>
          <div className="text-6xl font-bold text-[#eb4a36]">
            <CountUp end={userCount} duration={10} />
          </div>
          <p className="text-gray-600 mt-4">
            Join a community of food enthusiasts and home cooks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
