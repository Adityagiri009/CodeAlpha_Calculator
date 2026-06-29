import "./History.css";
import { FaHistory } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function History({ history, clearHistory }) {
  return (
    <div className="history">

      <div className="history-header">

        <div className="history-title">
          <FaHistory />
          <span>History</span>
        </div>

        <button
          className="history-clear"
          onClick={clearHistory}
        >
          <MdDelete />
        </button>

      </div>

      {
        history.length === 0 ? (

          <p className="empty-history">
            No calculations yet
          </p>

        ) : (

          <ul className="history-list">

            {
              history.map((item,index)=>(
                <li key={index}>{item}</li>
              ))
            }

          </ul>

        )
      }

    </div>
  );
}

export default History;