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

export default {
  findAll,
  delete: deleteCustomer
};