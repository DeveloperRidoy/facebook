import Authentication from "../utils/functions/authentication";


const groups = () => {
    return <div className="h-full">groups</div>;
}

export default groups


export const getServerSideProps = async ({ req }) => await Authentication(req);