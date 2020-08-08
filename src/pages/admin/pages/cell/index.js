import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import Loading from "../../../../components/Loading";
import Postbutton from "../../../../components/Postbutton";

import api from "../../../../services/api";

import {
  DropdownCell,
  DropdownItem,
  Section,
  Form,
  Content,
  Footer,
} from "./styles";

export default function Devotional(props) {
  const [ dropdownSelectedIndex, setDropdownSelectedIndex ] = useState(0);
  const [ cellState, setCellState ] = useState({
    id: "",
    image: "",
    name: "",
    leader: "",
    phone: "",
    location: "",
    weekday: 4,
    hour: "",
    type: "",
  });
  const [ dropDownCellArray, setDropDownCellArray ] = useState([
    { value: "", label: "" },
  ]);
  const [ loading, setLoading ] = useState({ status: false, message: "" });
  const { userAccess, userInfo } = useContext(props.UserContext);
  const [ redirect, setRedirect ] = useState({ status: false, page: "/login" });

  async function fetchData() {
    if (!userAccess.includes("administrator_user")) {
      setRedirect({ status: true, page: "/admin" });
      return;
    }
    try {
      setLoading({ status: true, message: "Carregando células." });
      const response = await api.get("cells", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (!response) setRedirect({ status: true, page: "cell/new" });
      const cellArray = response.data.map(element =>
        normalizeToDropdown(element)
      );
      setLoading({ ...loading, status: false });
      setDropDownCellArray(cellArray);
      setCellState(cellArray[ dropdownSelectedIndex ].value);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setRedirect({ status: true, page: "/login" });
      } else {
        setRedirect({ status: true, page: "cell/new" });
      }
    }
  }

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  if (redirect.status) return <Redirect to={redirect.page} />;

  return (
    <Section>
      <Loading
        loading={loading.status}
        message={loading.message}
        ico={loading.ico}
      />
      <h1>Alteração de células</h1>
      <DropdownCell>
        <DropdownItem
          placeholder="Células"
          value={{
            value: cellState,
            label: `${cellState.name} (Líder ${cellState.leader})`,
          }}
          onChange={handleChangeCell}
          options={dropDownCellArray}
        />
      </DropdownCell>

      <Content>
        <Postbutton
          onClick={() => setRedirect({ status: true, page: "cell/new" })}
        />
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
          <select
            id="weekday"
            value={cellState.weekday}
            onChange={handleChangeWeekday}
          >
            <option value={0}>Domingo</option>
            <option value={1}>Segunda-feira</option>
            <option value={2}>Terça-feira</option>
            <option value={3}>Quarta-feira</option>
            <option value={4}>Quinta-feira</option>
            <option value={5}>Sexta-feira</option>
            <option value={6}>Sábado</option>
          </select>
          <p>Horário</p>
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
          <p>Tipo</p>
          <select id="type" value={cellState.type} onChange={handleChangeType}>
            <option value="Mista">Mista</option>
            <option value="de Casais">Casais</option>
            <option value="de Crianças">Crianças</option>
            <option value="de Homens">Homens</option>
            <option value="de Mulheres">Mulheres</option>
            <option value="da Terceira Idade">Terceira Idade</option>
            <option value="de Jovens">Jovens</option>
            <option value="de Juvenis">Juvenis</option>
          </select>
          <input
            id="image"
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleChangeImage}
          />
          {(cellState.image !== '') && (<div>
            <button onClick={() => setCellState({ ...cellState, image: '' })}>X</button>
            <img src={cellState.image} alt="" />
          </div>)}
        </Form>

        <Footer>
          <div>
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={deleteCell}
            >
              APAGAR
            </button>
          </div>
          <div>
            <button onClick={handleSubmitCell}>Salvar</button>
          </div>
        </Footer>
      </Content>
    </Section>
  );

  async function deleteCell() {
    if (window.confirm("Deseja realmente apagar esta célula?"))
      try {
        setLoading({ status: true, message: "Apagando célula" });
        await api.delete("/cell/" + cellState.id, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const newDropdownItens = dropDownCellArray.filter((item, index) => {
          if (index === dropdownSelectedIndex) return false;
          return true;
        });
        if (newDropdownItens.length === 0) {
          setRedirect({ status: true, page: "cell/new" });
          return;
        }
        setDropDownCellArray(newDropdownItens);
        setLoading({ status: true, message: "Apagado!", ico: "pulse" });
        if (newDropdownItens[ dropdownSelectedIndex ])
          handleChangeCell(newDropdownItens[ dropdownSelectedIndex ]);
        else handleChangeCell(newDropdownItens[ dropdownSelectedIndex - 1 ]);
        setTimeout(function () {
          setLoading({ ...loading, status: false });
        }, 2000);
      } catch (err) {
        setLoading({ ...loading, status: false });
        alert("Não foi possível apagar o devocional. Tente novamente");
        console.log(err.response.data);
      }
  }

  async function handleSubmitCell() {
    try {
      setLoading({ status: true, message: "Alterando dados da célula..." });
      await api.put("/cell/" + cellState.id, cellState, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setDropDownCellArray(
        dropDownCellArray.map((item, index) => {
          if (index === dropdownSelectedIndex)
            return normalizeToDropdown(cellState);
          return item;
        })
      );
      setLoading({ status: true, message: "Alterado!", ico: "pulse" });
      setTimeout(function () {
        setLoading({ ...loading, status: false });
      }, 2000);
    } catch (err) {
      setLoading({ ...loading, status: false });
      alert("Não foi possível alterar os dados da célula. Tente novamente");
    }
  }

  async function handleChangeCell(selectedState) {
    setDropdownSelectedIndex(
      dropDownCellArray.findIndex(item => item.value === selectedState.value)
    );
    setCellState(selectedState.value);
  }

  function normalizeToDropdown(value) {
    return { value, label: `${value.name} (Líder: ${value.leader})` };
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
  function handleChangeType(e) {
    setCellState({ ...cellState, type: e.target.value });
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
            inputFiles[ i ].type === "image/jpeg" ||
            inputFiles[ i ].type === "image/png"
          )
            return inputFiles[ i ];
        }
      }
    }
  }
}
