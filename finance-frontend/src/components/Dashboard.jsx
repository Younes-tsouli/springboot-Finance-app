import { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import Transactions from "./Transactions";
import Header from "./Header";
import Sidebar from "./Sidebar";
import api from "../api"; /* au lieu d'ecrire "https//:..." on utilise api
                           et on rajoute le complement du lien par rapport a l'action */
import ExpenseDonut from "./ExpenseDonut";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [dataByCategory, setDataByCategory] = useState([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => {
        const transactions = response.data;
        setTransactions(transactions);

        // 1. On groupe les montants par catégorie
        const totals = transactions.reduce((acc, curr) => {
          const cat = curr.category;
          const amount = parseFloat(curr.amount); // Assure-toi que c'est un nombre

          if (!acc[cat]) {
            acc[cat] = 0;
          }
          acc[cat] += amount;
          return acc;
        }, {});

        // 2. On transforme l'objet en tableau pour Recharts
        // Format attendu : [{ name: "Food", value: 400, color: "..." }]
        const colors = ["#418a3a", "#1b6325", "#094715", "#033814", "#012a14"];

        const chartData = Object.keys(totals).map((key, index) => ({
          name: key,
          value: totals[key],
          color: colors[index % colors.length], // Alterne les couleurs
        }));

        setDataByCategory(chartData);
      })
      .catch((error) => {
        console.error("Erreur fetch transactions:", error);
      });
  }, []);

  // On prépare l'objet exactement comme le back le veut
  const addTransaction = (formData) => {
    const transactionForBack = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type === "income" ? "INCOME" : "EXPENSE",
      date: new Date().toISOString().split("T")[0], // ajoute la date du jour (YYYY-MM-DD)
    };

    api
      .post("/transactions", transactionForBack)
      .then((response) => {
        // Une fois ajouté au back, on l'ajoute à l'état local
        // On garde le format du back pour la cohérence
        setTransactions([...transactions, response.data]);
      })
      .catch((err) => console.error("Erreur lors de l'envoi au back:", err));
  };

  //supprimer une transaction au backend
  const deleteTransaction = (id) => {
    api.delete(`/transactions/${id}`).then(() => {
      setTransactions(transactions.filter((t) => t.id !== id));
    });
  };

  const balance = transactions.reduce(
    (acc, t) => (t.type === "INCOME" ? acc + t.amount : acc - t.amount),
    0,
  );

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + (parseFloat(t.amount) || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + (parseFloat(t.amount) || 0), 0);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="month-info">
          <div className="carte" id="balance">
            <p className="title">Total Balance</p>
            <p className="money">€{balance}</p>
          </div>
          <div className="carte">
            <p className="title">Income this month</p>
            <p className="money income">+€{income}</p>
          </div>
          <div className="carte">
            <p className="title">Expenses this month</p>
            <p className="money expenses">-€{expenses}</p>
          </div>
        </div>
        <div className="more-info">
          <Transactions
            transactions={transactions}
            onDelete={deleteTransaction}
            number={6}
          />
          <div className="transactions-by-category">
            <div className="chart">
              <ExpenseDonut data={dataByCategory} />
            </div>
            <div className="categories"></div>
          </div>
        </div>
        <TransactionForm onAdd={addTransaction} />
      </div>
    </div>
  );
}
