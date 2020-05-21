import React, { useEffect, useState, useContext } from "react";

import api from "../../../services/api";
import Loading from '../../../components/Loading'
import { UserContext } from "..";
import { Section } from "../advert/styles";

export default function CellStudy() {
  const [ pdf, setpdf ] = useState("");
  const [ loading, setLoading ] = useState({ status: true, message: 'carregando página' });
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const localpdfFileTime = localStorage.getItem("cellstudy.time");
        if (!localpdfFileTime) {
          const { data } = await api.get("/cellstudy");
          const file = "data:application/pdf;base64," + data.pdf;
          localStorage.setItem("cellstudy.time", data.mtime);
          localStorage.setItem("cellstudy.pdf", pdf);
          setpdf(file);
        } else {
          const { data } = await api.get("/cellstudy/time");
          if (localpdfFileTime !== data.mtime) {
            const { data } = await api.get("/cellstudy");
            const file = "data:application/pdf;base64," + data.pdf;
            localStorage.setItem("cellstudy.time", data.mtime);
            localStorage.setItem("cellstudy.pdf", pdf);
            setpdf(file);
          } else {
            setpdf(localStorage.getItem("cellstudy.pdf"));
          }
        }
      } catch (err) {
        setLoading({ status: false })
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function handleChangepdf(e) {
    setLoading({ status: true, message: 'carregando arquivo' })
    const file = getpdf(e.target.files);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result === pdf) {
        setLoading({ status: true, message: 'Este arquivo já está carregado', ico: 'pulse' })
        setTimeout(() => setLoading({ status: false }, 1000));
      }
      setpdf(reader.result);
    };
    reader.readAsDataURL(file);

    function getpdf(inputFiles) {
      if (inputFiles.length !== 0) {
        for (let i = 0; i < inputFiles.length; i++) {
          if (inputFiles[ i ].type === 'application/pdf')
            return inputFiles[ i ];
        }
      }
    }
  }

  async function handleSubmitcellstudy(e) {
    e.preventDefault();
    const file = e.target[ 0 ].files[ 0 ];
    if (!file) {
      alert('Selecione um arquivo antes de enviar.');
      return
    }
    setLoading({ status: true, message: 'Enviando arquivo' })
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post("/cellstudy", formData, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200)
        setLoading({ status: true, message: 'Enviado!', ico: 'pulse' });
      setTimeout(() => setLoading({ ...loading, status: false }), 2000);
      document.getElementById('file').value = null;
    } catch (err) {
      alert('Erro ao enviar arquivo. Tente novamente');
      setLoading({ status: false })
    }
  }

  return (
    <>
      <Loading loading={loading.status} message={loading.message} ico={loading.ico} />
      <Section>
        <form id="cellstudy" encType="multipart/form-data" onSubmit={handleSubmitcellstudy}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleChangepdf}
            id="file"
            name="file"
          />
          <input type="submit" value="Upload" />
        </form>
        <embed
          width="100%"
          height="700px"
          src={pdf}
          type="application/pdf"
          onChange={() => setTimeout(() => setLoading({ status: false }, 1000))}
          onLoad={() => setLoading({ status: false })}
        />
      </Section>
    </>
  );
}
