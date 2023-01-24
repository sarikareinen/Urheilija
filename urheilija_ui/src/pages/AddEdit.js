import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  kasvattajanimi: "",
  kutsumanimi: "",
  syntymavuosi: "",
  paino: "",
  kuvalinkki: "",
  laji: "",
  saavutukset: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const {
    kasvattajanimi,
    kutsumanimi,
    syntymavuosi,
    paino,
    kuvalinkki,
    laji,
    saavutukset,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !kasvattajanimi ||
      !kutsumanimi ||
      !syntymavuosi ||
      !paino ||
      !kuvalinkki ||
      !laji ||
      !saavutukset
    ) {
      toast.error("Täytä tiedot kaikkiin kohtiin.");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            kasvattajanimi,
            kutsumanimi,
            syntymavuosi,
            paino,
            kuvalinkki,
            laji,
            saavutukset,
          })
          .then(() => {
            setState({
              kasvattajanimi: "",
              kutsumanimi: "",
              syntymavuosi: "",
              paino: "",
              kuvalinkki: "",
              laji: "",
              saavutukset: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Urheilija lisätty tietokantaan");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            kasvattajanimi,
            kutsumanimi,
            syntymavuosi,
            paino,
            kuvalinkki,
            laji,
            saavutukset,
          })
          .then(() => {
            setState({
              kasvattajanimi: "",
              kutsumanimi: "",
              syntymavuosi: "",
              paino: "",
              kuvalinkki: "",
              laji: "",
              saavutukset: "",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Urheilijan tiedot päivitetty.");
      }

      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="kasvattajanimi">Kasvattajanimi</label>
        <input
          type="text"
          id="kasvattajanimi"
          name="kasvattajanimi"
          value={kasvattajanimi || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="kutsumanimi">Kutsumanimi</label>
        <input
          type="text"
          id="kutsumanimi"
          name="kutsumanimi"
          value={kutsumanimi || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="syntymavuosi">Syntymävuosi</label>
        <input
          type="text"
          id="syntymavuosi"
          name="syntymavuosi"
          value={syntymavuosi || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="paino">Paino</label>
        <input
          type="number"
          id="paino"
          name="paino"
          value={paino || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="kuvalinkki">Kuvalinkki</label>
        <input
          type="text"
          id="kuvalinkki"
          name="kuvalinkki"
          value={kuvalinkki || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="laji">Laji</label>
        <input
          type="text"
          id="laji"
          name="laji"
          value={laji || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="saavutukset">Saavutukset</label>
        <input
          type="text"
          id="saavutukset"
          name="saavutukset"
          value={saavutukset || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Päivitä" : "Tallenna"} />
        <Link to="/">
          <input type="button" value="Etusivulle" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
