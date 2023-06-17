import axios from "../Services/axios"; //import axios customizes


const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name: name, job: job })
}

const putEditUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name: name, job: job })
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
}

const LoginApi = (email, pass) => {
    return axios.post("/api/login", { email: email, password: pass })
}
export { fetchAllUser, postCreateUser, putEditUser, deleteUser, LoginApi };