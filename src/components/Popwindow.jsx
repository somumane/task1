import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Style/Popup.css';

const Popup = ({ isOpen, close , id}) => {
  const [client,setClient]=useState([]);
  useEffect(() => {
    async function fetchClient() {
      try {
        const response = await axios.get("api/assignment.jsp?cmd=client_data");
        setClient(response.data.data);
      } catch (error) {
        setError("Error fetching client data: "+ error.message);
      }
    }
    fetchClient();
  }, []);
  return isOpen ? (
    <div className="popup">
      <div className="popup-inner">{
        client[id]?(<div>
        <p>Name:{client[id].name}</p>
        <p>Address:{client[id].address}</p>
        <p>Points:{client[id].points}</p>
        </div>):(<p>User Data is not found</p>)}
        <button onClick={close} className="close-button">
          Close
        </button>
      </div>
    </div>
  ) : null;
};

export default Popup;