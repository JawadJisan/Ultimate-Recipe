const RecipeCard = ({ sug }) => {
  return (
    <>
      <div className="card">
        <img src={sug.image} className="rounded-md w-full h-[250px]" alt="" />
        <h4 className="my-2"> {sug.name.slice(0, 20)}.. </h4>
        <div className="py-2 flex justify-between items-center gap-2 text-xs text-gray-500">
          <span>
            Category:{" "}
            <span className="text-[#eb4a36] font-bold text-sm">
              {" "}
              {sug.category}{" "}
            </span>{" "}
          </span>
          <br />
          <br />
          <span>By: {sug.creatorEmail}</span>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
