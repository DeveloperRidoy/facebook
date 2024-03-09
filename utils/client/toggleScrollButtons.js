const toggleScrollButtons = (e, state, setState) => {
  const scrollWidth = e.target.scrollWidth;
  const scrollLeft = e.target.scrollLeft;
  const offsetWidth = e.target.offsetWidth;
    const firstCon = Object.keys(state)[0];
    const secondCon = Object.keys(state)[1];
    
  // disable scrollLeft on start
  if (scrollLeft === 0) {
    return setState({[firstCon]: false, [secondCon]: true  });
  }

  // enable scrollLeft and disable scrollRight on end
  if (scrollLeft + offsetWidth === scrollWidth) {
    return setState({
      [firstCon]: true,
      [secondCon]: false,
    });
  }

  // enable both scrollLeft and scrollRight on middle
  if (scrollLeft > 0) {
    return setState({ [firstCon]: true, [secondCon]: true });
  }
};


export default toggleScrollButtons;