
import UserList from "./UserList";
const page = async () => {

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
    const data = await res.json();

    if (data && data.users)
        return <UserList users={data.users} />

    return (
        <h1>Loading...</h1>
    )
}

export default page