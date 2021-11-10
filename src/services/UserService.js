import axios from "axios";

const url = "http://localhost:8080/users/"


class UserService {
    
    getAllUsers() {
        return axios.get(url)
    }

    getUser(id) {
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } }; 
        return axios.get(url + id, config)
    }

    deleteUser(id) {
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } };
        return axios.delete(url + id, config)
    }

    updateUser(username, password, id) {
        const body = { username: username, password: password, userType: "REGULAR" }
        const config = { headers: { Authorization: JSON.parse(localStorage.getItem("user")).token } };
        return axios.put(url+ id, body, config)
    }

}

export default new UserService()