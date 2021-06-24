import Spinner from "../Spinners/Spinner/Spinner"

const Button = ({ children, className, loading, disabled, spinner, type }) => {
    return (
      <button
        className={`flex justify-center items-center gap-x-1 ${className}`}
        disabled={disabled}
        type={type}
      >
        {children}
        {loading && <Spinner className={`border-white ${spinner}`} />}
      </button>
    );
}

export default Button
