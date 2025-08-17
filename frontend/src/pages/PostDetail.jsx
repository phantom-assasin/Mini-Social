import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";

const PostDetail = () => {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/post/${id}`
      );
      console.log(response);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="text-center w-1/2 mx-auto my-12 p-6 rounded-lg border border-gray-200 shadow-lg">
      <h1 className="font-bold text-2xl">{post.title}</h1>
      <p>{post.content}</p>
      <div className="p-4 text-left">
        {new Array(5).fill(0).map((_, idx) => (
          <Comment key={idx} level={idx > 2 ? idx - 3 : idx} />
        ))}
      </div>
      <Link to="/posts" className="px-4 py-2 rounded-lg bg-blue-400 text-white">
        To List
      </Link>
    </div>
  );
};

export default PostDetail;
