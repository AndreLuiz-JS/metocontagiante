import React, { useEffect, useState, useContext } from "react";

import api from "../../../services/api";
import Loading from '../../../components/Loading'
import { UserContext } from "../";
import { Section } from "./styles";

export default function Advert() {
  const [ pdf, setPdf ] = useState("");
  const [ loading, setLoading ] = useState({ status: true, message: 'carregando página' });
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const localPdfFileTime = localStorage.getItem("advert.time");
        if (!localPdfFileTime) {
          const { data } = await api.get("/advert");
          const pdf = "data:application/pdf;base64," + data.pdf;
          localStorage.setItem("advert.time", data.mtime);
          localStorage.setItem("advert.pdf", pdf);
          setPdf(pdf);
        } else {
          const { data } = await api.get("/advert/time");
          if (localPdfFileTime !== data.mtime) {
            const { data } = await api.get("/advert");
            const pdf = "data:application/pdf;base64," + data.pdf;
            localStorage.setItem("advert.time", data.mtime);
            localStorage.setItem("advert.pdf", pdf);
            setPdf(pdf);
          } else {
            setPdf(localStorage.getItem("advert.pdf"));
          }
        }
      } catch (err) {
        setLoading({ status: false })
        console.log(err.response.data);
      }
    }
    fetchData();
  }, []);

  function handleChangePdf(e) {
    setLoading({ status: true, message: 'carregando arquivo pdf' })
    const file = getPdf(e.target.files);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result === pdf) {
        setLoading({ status: true, message: 'Este arquivo já está carregado', ico: 'pulse' })
        setTimeout(() => setLoading({ status: false }, 1000));
      }
      setPdf(reader.result);
    };
    reader.readAsDataURL(file);

    function getPdf(inputFiles) {
      if (inputFiles.length !== 0) {
        for (let i = 0; i < inputFiles.length; i++) {
          if (inputFiles[ i ].type === "application/pdf") return inputFiles[ i ];
        }
      }
    }
  }

  async function handleSubmitAdvert(e) {
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
      const response = await api.post("/advert", formData, {
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
        <form id="advert" encType="multipart/form-data" onSubmit={handleSubmitAdvert}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleChangePdf}
            id="file"
            name="file"
          />
          <input type="submit" value="Upload" />
        </form>
        <embed
          width="100%"
          height={window.innerHeight - 120}
          src={pdf}
          type="application/pdf"
          onChange={() => setTimeout(() => setLoading({ status: false }, 1000))}
          onLoad={() => setLoading({ status: false })}
        />
      </Section>
    </>
  );
}
