import React from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import "./History.css";

function History() {
  const { History } = useGlobalContext();

  const [...history] = History();

  return (
    <div id="history-container">
      <div className="history-styled">
        <h1>Recent History</h1>
        {history.map((item) => {
          const { _id, title, amount, type } = item;
          return (
            <div key={_id} className="history-item">
              <p
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {title}
              </p>

              <p
                style={{
                  color: type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {type === "expense"
                  ? `- ₹ ${amount <= 0 ? 0 : amount}`
                  : `+ ₹ ${amount <= 0 ? 0 : amount}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
