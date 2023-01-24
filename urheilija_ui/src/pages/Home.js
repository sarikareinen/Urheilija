import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteUrheilija = (id) => {
    if (
      window.confirm(
        "Oletko varma, että haluat poistaa tämän urheilijan tietokannasta?"
      )
    ) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Urheilija poistettu onnistuneesti.");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "150" }}>
      <Link to="/lisaa">
        <button className="btn btn-contact">Lisää urheilija</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Kasvattajanimi</th>
            <th style={{ textAlign: "center" }}>Kutsumanimi</th>
            <th style={{ textAlign: "center" }}>Syntymävuosi</th>
            <th style={{ textAlign: "center" }}>Paino</th>
            <th style={{ textAlign: "center" }}>Kuvalinkki</th>
            <th style={{ textAlign: "center" }}>Laji</th>
            <th style={{ textAlign: "center" }}>Saavutukset</th>
            <th style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.kasvattajanimi}</td>
                <td>{item.kutsumanimi}</td>
                <td>{item.syntymavuosi}</td>
                <td>{item.paino}</td>
                <td>{item.kuvalinkki}</td>
                <td>{item.laji}</td>
                <td>{item.saavutukset}</td>
                <td>
                  <Link to={`/muokkaa/${item.id}`}>
                    <button className="btn btn-edit">Muokkaa</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteUrheilija(item.id)}
                  >
                    Poista
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">Näytä</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
