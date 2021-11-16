import React from "react";
import Table from 'react-bootstrap/Table'
import useSWR from "swr";
import UserService from "../services/UserService";
import { MasterPage } from "./MasterPage";
import { Link, Redirect} from "react-router-dom";
import COLORS from "../configurations/CSSConfiguration";
 
function UserListPage () {
    //TODO pagination?
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if(!currentUser || currentUser.userType !== "ADMIN"){
        return <Redirect to="/"/>
    }
    const {users, isLoading, isError} = GetUsers()
    if(isLoading) return <p>Fetching users...</p>
    if(isError) return <p style={{color:'red'}}>{JSON.stringify(isError.message)}</p>

    return (
        <MasterPage>
            <h2>Users</h2>
            <Table variant="dark" hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>User Type</th>
                    <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return(<tr>
                        <td>{index + 1}</td>
                        <td><Link to={"/profile/" + user.id} style={{color: COLORS.complementary}}>{user.username}</Link></td>
                        <td>{user.userType}</td>
                        <td>{user.id}</td>
                    </tr>);
                    })
                }
                </tbody>
            </Table>
        </MasterPage>
 

    );
}


function GetUsers() {
    const url = "http://localhost:8080/users"
    const fetcher = () => UserService.getAllUsers().then(res => res.data)
    const {data, error} = useSWR(url, fetcher)
    return ({
        users: data,
        isLoading: !data && !error,
        isError: error,
    });
}
 
export default UserListPage;