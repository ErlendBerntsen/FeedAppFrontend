import axios from "axios";

const url = "http://localhost:8080"

class AuthService {

    login(username, password) {
        const body = { username: username, password: password }
        return axios.post(url + "/login", body)
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
        return axios.post(url + "/users", body)

    }

    logout() {
        localStorage.removeItem("user")
        alert("Logged out")
        window.location.reload(false);
    }
}

export default new AuthService()