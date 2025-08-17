import { Link } from "react-router-dom";

const Post = ({ id = -1, title = "", content = "" }) => {
  return (
    <div className="w-full border border-gray-200 rounded-lg p-2 shadow-md">
      <div className="max-h-48 overflow-auto mb-2">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p>{content}</p>
      </div>

      <Link
        to={`/posts/${id}`}
        className="px-4 py-2 rounded w-full bg-blue-400 block text-white text-center"
      >
        Details
      </Link>
    </div>
  );
};

export default Post;
