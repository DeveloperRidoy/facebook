import Spinner from "../Spinners/Spinner/Spinner"

const Button = ({ children, className, loading, disabled, spinner }) => {
    return (
      <button
        className={`flex justify-center items-center gap-x-1 ${className}`}
        disabled={disabled}
      >
        {children}
        {loading && <Spinner className={`border-white ${spinner}`} />}
      </button>
    );
}

export default Button
