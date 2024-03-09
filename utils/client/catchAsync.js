const catchAsync = (fn, setState, cb) => {
  fn().catch((err) => {
    console.log("Client error: ", err)
    setState((state) => ({
      ...state,
      loading: false,
      alert: {
        show: true,
        text: err?.response?.data?.message || err?.message || "Network Error",
        type: "danger",
      },
    }));
    if (cb) return cb();
  });
};

export default catchAsync;
