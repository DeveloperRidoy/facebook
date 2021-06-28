import Authentication from "../utils/functions/authentication";


const marketplace = () => {
    return <div className=" h-full">marketplace</div>;
}

export default marketplace


export const getServerSideProps = async ({ req }) => await Authentication(req);