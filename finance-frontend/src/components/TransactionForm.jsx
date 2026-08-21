import React, { useState } from "react";

export default function TransactionForm(props) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
    date: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic to handle form submission, e.g., send to API
    props.onAdd(formData);
    setFormData({
      title: "",
      amount: "",
      category: "",
      type: "",
      date: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="transaction-form">
      <form className="form" name="transaction" onSubmit={handleSubmit}>
        <h1 className="title">Add a Transaction</h1>
        <label>
          Name:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="type"
              value="income"
              onChange={handleChange}
              checked={formData.type === "income"}
            />
            <span>Income</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="type"
              value="expenses"
              onChange={handleChange}
              checked={formData.type === "expenses"}
            />
            <span>Expenses</span>
          </label>
        </div>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Choose a category</option>
            <option value="food">Food & Dining</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="healthcare">Healthcare</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
