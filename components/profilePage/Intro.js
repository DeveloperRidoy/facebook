const Intro = () => {
    return (
        <div className="dark:bg-dark shadow p-2 rounded-lg grid gap-y-3">
            <p className="text-lg font-semibold">Intro</p>
            <Button>add bio</Button>
            <Button>edit details</Button>
            <Button>add hobbies</Button>
            <Button>add features</Button>
        </div>
    )
}

export default Intro

const Button = ({ children }) => (
  <button className="capitalize font-semibold bg-dark-400 rounded-md p-1.5 hover:brightness-125 transition active:scale-95">
    {children}
  </button>
);