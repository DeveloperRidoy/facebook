import Spinner from "../Spinners/Spinner/Spinner"

const Button = ({ children, className, loading, disabled, spinner, type, onClick }) => {
    return (
      <button
        className={`flex justify-center items-center gap-x-1 ${className}`}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
        {loading && <Spinner className={`border-white ${spinner}`} />}
      </button>
    );
}

export default Button
