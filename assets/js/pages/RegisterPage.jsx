import React, { useState } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import UsersAPI from "../services/usersAPI";
import { toast } from "react-toastify";

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};

        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            toast.error("Il y a des erreurs dans votre formulaire !");
            return;
        }

        try {
            await UsersAPI.register(user);
            setErrors({});
            toast.success(
                "Vous êtes désormais inscrit, vous pouvez vous connecter !"
              );
            history.replace("/login");
        } catch (error) {
            const { violations } = error.response.data;

            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Il y a des erreurs dans votre formulaire !");
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Inscription</h1>
                        <form onSubmit={handleSubmit}>
                            <Field
                                name="firstName"
                                label="Prénom"
                                placeholder="Votre joli prénom"
                                error={errors.firstName}
                                value={user.firstName}
                                onChange={handleChange}
                            />
                            <Field
                                    name="lastName"
                                    label="Nom de famille"
                                    placeholder="Votre nom de famille"
                                    error={errors.lastName}
                                    value={user.lastName}
                                    onChange={handleChange}
                            />
                            <Field
                                name="email"
                                label="Adresse email"
                                placeholder="Votre adresse email"
                                type="email"
                                error={errors.email}
                                value={user.email}
                                onChange={handleChange}
                            />
                            <Field
                                name="password"
                                label="Mot de passe"
                                type="password"
                                placeholder="Votre mot de passe"
                                error={errors.password}
                                value={user.password}
                                onChange={handleChange}
                            />
                            <Field
                                name="passwordConfirm"
                                label="Confirmation de mot de passe"
                                type="password"
                                placeholder="Confirmez votre super mot de passe"
                                error={errors.passwordConfirm}
                                value={user.passwordConfirm}
                                onChange={handleChange}
                            />

                            <div className="form-group">
                                <button type="submit" className="btn btn-success mt-3">
                                    Confirmation
                                </button>
                                <Link to="/login" className="btn btn-link mt-3 mx-2">
                                    J'ai déjà un compte
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;