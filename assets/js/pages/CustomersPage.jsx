import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import { Link } from "react-router-dom";

const CustomersPage = props => {  
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    // Permet d'aller récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            setCustomers(originalCustomers);
        }
    };

    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 13;

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
        <div className="form-group">
            <input
                type="text"
                onChange={handleSearch}
                value={search}
                className="form-control"
                placeholder="Rechercher ..."
            />
        </div>
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
            {loading && (
                <tbody>
                    <tr>
                        <td colSpan="6">
                            Chargement..
                        </td>
                    </tr>
                </tbody>
            )}
            {!loading && (
                <tbody>
                    {paginatedCustomers.map(customer => (
                    <tr key={customer.id}>
                        <td>
                            {customer.id}
                        </td>
                        <td>
                            {customer.firstName} {customer.lastName}
                        </td>
                        <td>
                            {customer.email}
                        </td>
                        <td>
                            {customer.company}
                        </td>
                        <td className="text-center">
                            <span className="badge badge-primary">
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
            )}
        </table>
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