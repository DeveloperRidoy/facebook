import Image from 'next/image';

const UserItem = (user) => {
    return (
        <button className=" h-10 w-10 relative">
            <Image src={`/img/users/${user.photo || 'default/user.jpeg'}`} alt={user?.name || 'user'} layout="fill" className=" rounded-full"/>
        </button>
    )
}

export default UserItem
