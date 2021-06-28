import Authentication from "../utils/functions/authentication";


const watch = () => {
    return (
        <div className=" h-full">
            watch
        </div>
    )
}

export default watch


export const getServerSideProps = async ({ req }) => await Authentication(req);