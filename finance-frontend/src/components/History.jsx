import React, { useEffect } from "react";
import { useState } from "react";
import api from "../api";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function History(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/transactions").then((responce) => {
      setTransactions(responce.data);
    });
  }, []);

  const formattedTransactionList = transactions.map((t) => {
    const type = String(t.type).toLowerCase();
    const normalizedType = type.includes("income") ? "income" : "expense"; // take notes
    return (
      <div key={t.id} className="transaction-item">
        <span className="transaction-title">{t.title}</span>
        <span className={`transaction-amount ${normalizedType}`}>
          €{parseFloat(t.amount).toFixed(2)}
        </span>
      </div>
    );
  });

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="transaction-container">
          <h1 className="title">All Transactions</h1>
          <div className="recent-transactions">
            {formattedTransactionList}
          </div>
        </div>
      </div>
    </div>
  );
}
