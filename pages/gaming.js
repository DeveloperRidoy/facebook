import Authentication from "../utils/functions/authentication";


const gaming = () => {
    return <div className=" h-full">gaming</div>;
}

export default gaming

export const getServerSideProps = async ({ req }) => await Authentication(req);
