import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);

  return (
    <div stgyle={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Urheilijan tiedot</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Kasvattajanimi: </strong>
          <span>{user.kasvattajanimi}</span>
          <br />
          <br />
          <strong>Kutsumanimi: </strong>
          <span>{user.id}</span>
          <br />
          <br />
          <strong>Syntymävuosi: </strong>
          <span>{user.syntymavuosi}</span>
          <br />
          <br />
          <strong>Paino: </strong>
          <span>{user.paino}</span>
          <br />
          <br />
          <strong>Kuvalinkki: </strong>
          <span>{user.kuvalinkki}</span>
          <br />
          <br />
          <strong>Laji: </strong>
          <span>{user.laji}</span>
          <br />
          <br />
          <strong>Saavutukset: </strong>
          <span>{user.saavutukset}</span>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-edit">Etusivulle</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
