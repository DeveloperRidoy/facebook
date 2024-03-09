const NotFound = () => {
    return (
      <div className="h-full w-screen bg-secondary dark:bg-darker relative flex items-center justify-center dark:text-white text-lg">
        <div className="flex items-center gap-x-4">
          <p>404</p>
          <div className="h-10 border border-l-gray-500 dark:border-l-white "></div>
          <p>{"This page could not be found"} </p>
        </div>
      </div>
    );
}

export default NotFound
