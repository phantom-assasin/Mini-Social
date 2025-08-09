import { Link } from "react-router-dom";
import BasicLayout from "../layout/BasicLayout";

const Home = () => {
  return (
    <div className="pt-12">
      <h1 className="text-3xl text-center font-bold mb-4">
        Welcome to Our Mini-Social App
      </h1>
      <p className="text-gray-600 text-center mb-8">
        This is a simple social media app.
      </p>
    </div>
  );
};

export default Home;
