import React, { useEffect, useState } from "react";
import Popup from "./Popwindow";
import axios from "axios";
import "./Style/ClientList.css";
const ClientList = () => {
  const [data, setdata] = useState([]);
  const [popdata,setpopdata]=useState([]);
  const [filter, setFilter] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // All Functions
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleClick = (id) => {
    setpopdata(id);
    openPopup();
  };

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get("api/assignment.jsp?cmd=client_data");
        setdata(response.data.clients);
      } catch (error) {
        setError("Error fetching client data: " + error.message);
      }
    }
    fetchClients();
  }, []);

  // Filter
  const filteredClients =
    filter === "all"
      ? data
      : filter === "managers"
      ? data.filter((client) => client.isManager)
      : data.filter((client) => !client.isManager);

  return (
    <div className="client-list">
      <h1>Client List</h1>
      <label>
        Filter by:
        <select value={filter} onChange={handleChangeFilter}>
          <option value="all">All Clients</option>
          <option value="managers">Managers</option>
          <option value="non-managers">Non-Managers</option>
        </select>
      </label>
      <ul className="client-items">
        {filteredClients.map((element) => (
          <li key={element.id} className="client-item" onClick={() => handleClick(element.id)}>
            {element.label}
          </li>
        ))}
      </ul>
      <Popup isOpen={isPopupOpen} close={closePopup} id={popdata} />
    </div>
  );
};
export default ClientList;
