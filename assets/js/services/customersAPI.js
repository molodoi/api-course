import axios from "axios";

async function findAll() {
    return axios.get("http://127.0.0.1:8000/api/clients/").then(response => {
        const customers = response.data["hydra:member"];
        return customers;
    });
}

function deleteCustomer(id) {
    return axios.delete("http://127.0.0.1:8000/api/customers/" + id).then(async response => {
        return response;
    });
}

async function find(id) {
    return axios.get("http://127.0.0.1:8000/api/client/" + id).then(response => response.data);
}

function update(id, customer) {
    return axios.put("http://127.0.0.1:8000/api/customers/" + id, customer).then(response => response.data);
}
  
function create(customer) {
    return axios.post("http://127.0.0.1:8000/api/customers", customer).then(response => response.data);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCustomer
};