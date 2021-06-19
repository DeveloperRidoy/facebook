import Button from "./Button";

const PostButton = ({loading, children, disabled}) => {
    return (
      <Button
        type="submit"
        loading={loading}
        className="w-full py-1.5 bg-blue-500 text-white hover:bg-blue-600 active:focus:outline-none active:scale-[99%] active:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed rounded transition transform capitalize font-semibold"
        disabled={disabled}
      >
        {children}
      </Button>
    );
}

export default PostButton
