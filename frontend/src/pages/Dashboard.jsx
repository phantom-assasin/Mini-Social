import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Post from "../components/Post";
import PostModal from "../components/PostModal";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/post`);
      return response.data;
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/post`,
        newPost
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post successfully created.");
      refetch();
    },
  });

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onSubmit = (data) => {
    createPostMutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (posts.length)
    return (
      <>
        <button
          className="px-4 py-2 rounded-lg bg-blue-400 text-white"
          onClick={onOpen}
        >
          Create Post
        </button>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-4">
          {posts?.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
        <PostModal isOpen={open} onClose={onClose} onSubmit={onSubmit} />
        <Toaster />
      </>
    );
};

export default Dashboard;
