import axios from "axios";
import { BACKEND_ENDPOINT } from "../config";

class AuthService {

    login(username, password) {
        const body = { username: username, password: password }
        return axios.post(BACKEND_ENDPOINT + "/login", body)
            .then(response => {
                if (response.headers.authorization) { //user was authenticated
                    const auth = {
                        'token': response.headers.authorization
                    }
                    //stores username, id and token in one json string. please change this if you know a better way.
                    localStorage.setItem("user", JSON.stringify(Object.assign({}, response.data, auth)))
                }
            })
    }

    register(username, password) {
        const body = { username: username, password: password }
        return axios.post(BACKEND_ENDPOINT + "/users", body)

    }

    logout() {
        localStorage.removeItem("user")
        alert("Logged out")
        window.location.reload(false);
    }
}

export default new AuthService()