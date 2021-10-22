import React from "react";
import axios from "axios";
import useSWR from "swr";
 
function Users () {

    const {users, isLoading} = GetUsers()

    if(isLoading) return <p>Fetching users...</p>

    return (
      <div>
        <h2>Users</h2>
        <ul>
            {users.map(user => <li key={user.id}>{JSON.stringify(user)}</li>)}
        </ul>
      </div>
    );
}


function GetUsers() {
    const url = "http://localhost:8080/users"
    const fetcher = () => axios.get(url).then(res => res.data)
    const {data, error} = useSWR(url, fetcher)
    return ({
        users: data,
        isLoading: !data && !error,
        isError: error,
    });
}
 
export default Users;