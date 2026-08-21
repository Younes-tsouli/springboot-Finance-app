import { useNavigate } from "react-router-dom";

export default function Transactions({ transactions, onDelete }) {
  // Show only the last 6 transactions
  const recentTransactions = transactions.slice(-6);

  const formattedTransactionList = recentTransactions.map((t) => {
    const type = String(t.type).toLowerCase();
    const normalizedType = type.includes("income") ? "income" : "expense"; // take notes
    return (
      <div key={t.id} className="transaction-item">
        <span className="transaction-title">{t.title}</span>
        <span className={`transaction-amount ${normalizedType}`}>
          {normalizedType == "expense" ? "-" : ""}€{parseFloat(t.amount).toFixed(2)}
        </span>
        <button className="delete-btn" onClick={() => onDelete(t.id)}>
          ×
        </button>
      </div>
    );
  });

  const navigate = useNavigate();

  return (
    <div className="transaction-container">
      <h1 className="title">Recent transactions</h1>
      <div className="recent-transactions">{formattedTransactionList}</div>
      {transactions.length > 6 && (
        <button className="view-all-btn" onClick={() => navigate("/history")}>
          View All History
        </button>
      )}
    </div>
  );
}
