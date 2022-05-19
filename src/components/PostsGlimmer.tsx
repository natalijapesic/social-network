import PostGlimmer from "./PostGlimmer";

const PostsGlimmer: React.FC = () => {
  return (
    <div className="flex-row flex-wrap">
      {Array(10).map((value: undefined, index: number) => (
        <PostGlimmer key={index} />
      ))}
    </div>
  );
};

export default PostsGlimmer;
