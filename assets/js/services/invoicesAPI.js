import axios from "axios";
import Cache from "./cache";

async function findAll() {
    const cachedInvoices = await Cache.get("invoices");
    if (cachedInvoices) return cachedInvoices;
    return axios
    .get('http://127.0.0.1:8000/api/invoices/')
    .then(response => {
        const invoices = response.data["hydra:member"];
        Cache.set("invoices", invoices);
        return invoices;
    });
}

async function find(id) {
    const cachedInvoices = await Cache.get("invoices." + id);
    if (cachedInvoices) return cachedInvoices;
    return axios.get('http://127.0.0.1:8000/api/invoices/' + id).then(response => {
        const invoice = response.data;    
        Cache.set("invoices." + id, invoice);    
        return invoice;
    });
}

function deleteInvoice(id) {
    return axios.delete('http://127.0.0.1:8000/api/invoices/' + id).then(async response => {
        const cachedInvoices = await Cache.get("invoices");    
        if (cachedInvoices) {
            Cache.set("invoices", cachedInvoices.filter(c => c.id !== id));
        }    
        return response;
    });
}

function update(id, invoice) {
    return axios.put('http://127.0.0.1:8000/api/invoices/' + id, {...invoice, customer: `/api/client/${invoice.customer}`})
    .then(async response => {
        const cachedInvoices = await Cache.get("invoices");
        const cachedInvoice = await Cache.get("invoices." + id);    
        if (cachedInvoice) {
          Cache.set("invoices." + id, response.data);
        }    
        if (cachedInvoices) {
          const index = cachedInvoices.findIndex(c => c.id === +id);
          cachedInvoices[index] = response.data;
        }    
        return response;
    });
}

function create(invoice) {
    return axios.post('http://127.0.0.1:8000/api/invoices', {
        ...invoice,
        customer: `/api/client/${invoice.customer}`
    }).then(async response => {
        const cachedInvoices = await Cache.get("invoices");    
        if (cachedInvoices) {
          Cache.set("invoices", [...cachedInvoices, response.data]);
        }    
        return response;
    });
}

export default {
  findAll,
  find,
  create,
  update,
  delete: deleteInvoice
};