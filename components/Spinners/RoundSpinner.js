const RoundSpinner = () => {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 border-2 dark:border-0 shadow-2xl border bg-white dark:bg-dark rounded-full z-50">
            <div className="h-10 w-10 rounded-full border-2 border-blue-500 border-b-[transparent] spin-360"></div>
        </div>
    )
}

export default RoundSpinner
