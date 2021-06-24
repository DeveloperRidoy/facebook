
const MenuIcon = ({className}) => {
    
    const Dot = () => (
      <i className={`h-[5px] w-[5px] rounded-full bg-black dark:bg-white ${className}`}></i>
    );
    
    return (
      <div>
        <div className="flex justify-center items-center gap-x-[2px] mb-0.5">
          <Dot/>
          <Dot/>
          <Dot />
        </div>
        <div className="flex justify-center items-center gap-x-[2px] mb-0.5">
          <Dot/>
          <Dot/>
          <Dot/>
        </div>
        <div className="flex justify-center gap-x-[2px] items-center">
          <Dot/>
          <Dot/>
          <Dot/>
        </div>
      </div>
    );  
}

export default MenuIcon
