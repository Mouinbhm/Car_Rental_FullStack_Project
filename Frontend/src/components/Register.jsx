import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client"); // conforme au schema
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:5000/users/addUser", // adapte à ta route réelle
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          role,
          userImg: "client.png", // optionnel (default côté serveur)
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", res.data);
      setSuccess("Registration successful! Please log in.");
      // Reset simple du formulaire
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("client");
    } catch (err) {
      if (err.response) {
        // erreurs renvoyées par ton API
        const apiMsg =
          err.response.data?.message ||
          err.response.data?.errors?.email ||
          "Registration failed. Please try again.";
        setError(apiMsg);
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white rounded-lg p-8 shadow-lg mt-24">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="firstName"
          >
            First name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="lastName"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // pattern aligné sur ta regex backend (lettres/chiffres, 8+, 1 maj, 1 min, 1 chiffre)
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            title="At least 8 characters with 1 uppercase, 1 lowercase, and 1 number. Letters and digits only."
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="role"
          >
            Role
          </label>
          <select
            id="role"
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <div className="mt-3 text-red-600">{error}</div>}
      {success && <div className="mt-3 text-green-600">{success}</div>}
    </section>
  );
};

export default Register;
