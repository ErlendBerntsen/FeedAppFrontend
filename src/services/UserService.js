import axios from "axios";

const url = "http://localhost:8080/users/"

class UserService {

    getContent(id) {
        return axios.get(url + id)
    }

    deleteUser(id) {
        return axios.delete(url + id)
    }

}

export default new UserService()