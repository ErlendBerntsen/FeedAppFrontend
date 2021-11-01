import axios from "axios";

const url = "http://localhost:8080/users/"

class UserService {

    getContent(id) {
        console.log(url+id)
        return axios.get(url+id)
    }

}

export default new UserService()