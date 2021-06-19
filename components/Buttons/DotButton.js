const DotButton = ({className, tooltip, tooltipright}) => {
    return (
      <button
        className={`flex justify-center items-center gap-x-[2px] h-8 w-8 hover:bg-gray-200 active:bg-gray-300 transition active:outline-none rounded-full ${className}`}
        tooltip={tooltip}
        tooltipright={tooltipright}
      >
        <div className="h-[3px] w-[3px] rounded-full bg-black"></div>
        <div className="h-[3px] w-[3px] rounded-full bg-black"></div>
        <div className="h-[3px] w-[3px] rounded-full bg-black"></div>
      </button>
    );
}

export default DotButton
