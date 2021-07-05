const UserItem = (user) => {
    return (
        <button className="h-10 w-10 ">
            <img src={user.photo ? `img/users/${user.photo}`: 'img/users/default/user.jpeg'} alt={user?.name || 'user'} className="h-full w-full rounded-full"/>
        </button>
    )
}

export default UserItem
