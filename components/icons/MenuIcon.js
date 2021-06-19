
const MenuIcon = () => {
    
    const Dot = () => (
      <i className="h-[4px] w-[4px] rounded-full bg-black ml-0.5"></i>
    );
    
    return (
      <div>
        <div className="flex mb-0.5">
          <Dot/>
          <Dot/>
          <Dot />
        </div>
        <div className="flex mb-0.5">
          <Dot/>
          <Dot/>
          <Dot/>
        </div>
        <div className="flex">
          <Dot/>
          <Dot/>
          <Dot/>
        </div>
      </div>
    );  
}

export default MenuIcon
