const februaryDays = (month, year) => {
    let days = 31;
    if (month === 0) return days;

    if (month <= 7) {
      days = 31;
      if (month % 2 === 0) {
        days = 30;
        if (month === 2) {
          days = 28;
          if (
            (year &&
              year % 4 === 0 &&
              year % 100 !== 0) ||
            year % 400 === 0
          )
            days = 29;
        }
      }
        return days;
    }

    if (month > 7) {
      days = 30;
      if (month % 2 === 0) days = 31;
        return days;
    }
}

export default februaryDays;