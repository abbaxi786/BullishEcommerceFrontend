import React, { useState } from "react";
import axios from "axios";

function PanelLogIn({ setLog }) {
    const [form, setForm] = useState({
        name: "",
        password: "",
    });

    const [error, setError] = useState("");

    // INPUT CHANGE
    function HandleChange(e) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    }

    // ADMIN LOGIN SUBMIT
    async function HandleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/adminLog`,
                {
                    name: form.name,
                    password: form.password,
                }
            );

            if (response.data.success) {
                sessionStorage.setItem("encrypt", JSON.stringify(response.data.encrypt));
                setLog(true);
                
            } else {
                setError(response.data.message);
            }

        } catch (error) {
            setError("Server error");
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">

            <div className="card shadow p-4" style={{ width: "360px" }}>

                <h3 className="text-center text-warning mb-3">
                    Admin Login
                </h3>

                <p className="text-center text-muted small mb-3">
                    Restricted access for administrators only
                </p>

                {error && (
                    <div className="alert alert-danger py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={HandleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Admin Username"
                        className="form-control mb-3"
                        value={form.name}
                        onChange={HandleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Admin Password"
                        className="form-control mb-3"
                        value={form.password}
                        onChange={HandleChange}
                    />

                    <button
                        className="btn btn-warning w-100 fw-bold"
                        type="submit"
                    >
                        Login as Admin
                    </button>

                </form>

            </div>
        </div>
    );
}

export default PanelLogIn;