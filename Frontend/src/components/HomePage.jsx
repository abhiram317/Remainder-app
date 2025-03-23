import React, { useState, useEffect } from "react";
import axios from "axios";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    personName: "",
    amount: "",
    date: "",
    interestRate: "",
    securityDocs: "",
    type: "To Pay",
    frequency: "Monthly"
  });

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/loans", formData);
      fetchLoans();
      setFormData({ personName: "", amount: "", date: "", interestRate: "", securityDocs: "", type: "To Pay", frequency: "Monthly" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#121212", color: "white", minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input type="text" name="personName" placeholder="Person Name" value={formData.personName} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <input type="number" name="interestRate" placeholder="Interest Rate (%)" value={formData.interestRate} onChange={handleChange} />
        <input type="text" name="securityDocs" placeholder="Security Documents" value={formData.securityDocs} onChange={handleChange} />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="To Pay">To Pay</option>
          <option value="To Receive">To Receive</option>
        </select>
        <select name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <button onClick={handleSubmit} style={{ background: "blue", color: "white", padding: "5px 10px" }}>Add</button>
      </div>

      <h3>Loan Records</h3>
      {loans.length === 0 ? <p>No expenses found</p> : (
        <ul>
          {loans.map((loan) => (
            <li key={loan.id}>{loan.personName} - ${loan.amount} - {loan.date} - {loan.interestRate}%</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoanForm;
