import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = props => {  
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    // Permet d'aller récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les clients");
        }
    };

    // Au chargement du composant, on va chercher les customers
    useEffect(() => {
        fetchCustomers();
    }, []);

    
    // Gestion de la suppression d'un customer
    const handleDelete = async id => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await CustomersAPI.delete(id);
            toast.success("Le client a bien été supprimé");
        } catch (error) {
            setCustomers(originalCustomers);
            toast.error("La suppression du client n'a pas pu fonctionner");
        }
    };

    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };


    // Filtrage des customers en fonction de la recherche
    const filteredCustomers = customers.filter(
        c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );

    // Pagination des données
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    );

    return <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Liste des clients</h1>
                        <Link to="/customers/new" className="btn btn-sm btn-outline-primary">
                            Créer un client
                        </Link>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={handleSearch}
                            value={search}
                            className="form-control"
                            placeholder="Rechercher ..."
                        />
                    </div>
                </div>
            </div>
        </div>

        {loading && <TableLoader />}
        
        {!loading && (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table table-hover mt-4">            
                                <thead>
                                    <tr>
                                        <th>Id.</th>
                                        <th>Client</th>
                                        <th>Email</th>
                                        <th>Entreprise</th>
                                        <th className="text-center">Factures</th>
                                        <th className="text-center">Montant total</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedCustomers.map(customer => (
                                    <tr key={customer.id}>
                                        <td>
                                            {customer.id}
                                        </td>
                                        <td>
                                            <Link to={"/customers/" + customer.id}>
                                                {customer.firstName} {customer.lastName}
                                            </Link>
                                        </td>
                                        <td>
                                            {customer.email}
                                        </td>
                                        <td>
                                            {customer.company}
                                        </td>
                                        <td className="text-center">
                                            <span className="badge rounded-pill bg-primary">
                                                {customer.invoices.length}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {customer.totalAmount.toLocaleString()} €
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(customer.id)}
                                                disabled={customer.invoices.length > 0}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {itemsPerPage < filteredCustomers.length && (
            <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={filteredCustomers.length}
            onPageChanged={handlePageChange}
            />
        )}
    </>
};

export default CustomersPage;