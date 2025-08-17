const Comment = ({ level = 0 }) => {
  const indentation = `ml-${2 * level}`;
  return <div className={`${indentation} p-2 border border-gray-200 rounded my-2`}>This is comment.</div>;
};

export default Comment;
