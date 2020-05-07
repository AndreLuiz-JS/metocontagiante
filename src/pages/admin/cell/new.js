import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import Loading from "../../../components/Loading";

import { UserContext } from "..";
import api from "../../../services/api";

import { Section, Form, Content, Footer } from "./styles";

export default function Devotional() {
  const [cellState, setCellState] = useState({
    image: "",
    name: "",
    leader: "",
    phone: "",
    location: "",
    weekday: "",
    hour: "",
    type: "",
  });
  const [loading, setLoading] = useState({ status: false, message: "" });
  const { userAccess, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState({ status: false, page: "/login" });

  useEffect(() => {
    if (!userAccess.includes("administrator_user"))
      setRedirect({ status: true, page: "/admin" });
  }, [userAccess]);

  if (redirect.status) return <Redirect to={redirect.page} />;

  return (
    <Section>
      <Loading
        loading={loading.status}
        message={loading.message}
        ico={loading.ico}
      />
      <h1>Inclusão de nova célula</h1>

      <Content>
        <Form>
          <p>Nome</p>
          <input
            type="text"
            value={cellState.name}
            onChange={handleChangeName}
          />

          <p>Líder</p>
          <input
            type="text"
            value={cellState.leader}
            onChange={handleChangeLeader}
          />
          <p>Dia</p>
          <input
            type="text"
            value={cellState.weekday}
            onChange={handleChangeWeekday}
          />

          <p>Hora</p>
          <input
            type="text"
            value={cellState.hour}
            onChange={handleChangeHour}
          />
          <p>Endereço</p>
          <input
            type="text"
            value={cellState.location}
            onChange={handleChangeLocation}
          />
          <p>Telefone</p>
          <input
            type="text"
            value={cellState.phone}
            onChange={handleChangePhone}
          />
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
          <img src={cellState.image} alt="" />
        </Form>

        <Footer>
          <div></div>
          <div>
            <button onClick={handleSubmitCell}>Salvar</button>
          </div>
        </Footer>
      </Content>
    </Section>
  );

  async function handleSubmitCell() {
    try {
      setLoading({ status: true, message: "Adicionando nova célula..." });
      await api.post("/cell", cellState, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setLoading({ status: true, message: "Célula adicionada!", ico: "pulse" });
      setTimeout(function () {
        setRedirect({ status: true, page: "/admin/cell" });
        setLoading({ ...loading, status: false });
      }, 2000);
    } catch (err) {
      setLoading({ ...loading, status: false });
      alert("Não foi possível adicionar a célula. Tente novamente");
    }
  }

  function handleChangeName(e) {
    setCellState({ ...cellState, name: e.target.value });
  }
  function handleChangeLeader(e) {
    setCellState({ ...cellState, leader: e.target.value });
  }
  function handleChangeWeekday(e) {
    setCellState({ ...cellState, weekday: e.target.value });
  }
  function handleChangeHour(e) {
    setCellState({ ...cellState, hour: e.target.value });
  }
  function handleChangeLocation(e) {
    setCellState({ ...cellState, location: e.target.value });
  }
  function handleChangePhone(e) {
    setCellState({ ...cellState, phone: e.target.value });
  }
  async function handleChangeImage(e) {
    const file = getImage(e.target.files);
    const reader = new FileReader();
    reader.onloadend = () => {
      const size = Math.round(reader.result.length / 1024);
      if (size > 300)
        alert(
          `A imagem não pode ter mais de 300kb! Esta imagem possui ${size}kb após a descompactação.`
        );
      else setCellState({ ...cellState, image: reader.result });
    };
    reader.readAsDataURL(file);

    function getImage(inputFiles) {
      if (inputFiles.length !== 0) {
        for (let i = 0; i < inputFiles.length; i++) {
          if (
            inputFiles[i].type === "image/jpeg" ||
            inputFiles[i].type === "image/png"
          )
            return inputFiles[i];
        }
      }
    }
  }
}
