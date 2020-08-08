import React, { useEffect, useState, useContext } from "react";

import api from "../../../../services/api";
import Loading from '../../../../components/Loading'
import { Section } from "./styles";

export default function Advert(props) {
  const [ jpg, setJpg ] = useState("");
  const [ loading, setLoading ] = useState({ status: true, message: 'carregando página' });
  const { userInfo } = useContext(props.UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const localjpgFileTime = localStorage.getItem("advert.time");
        if (!localjpgFileTime) {
          const { data } = await api.get("/advert");
          const jpg = "data:image/jpg;base64," + data.jpg;
          localStorage.setItem("advert.time", data.mtime);
          localStorage.setItem("advert.jpg", jpg);
          setJpg(jpg);
        } else {
          const { data } = await api.get("/advert/time");
          if (localjpgFileTime !== data.mtime) {
            const { data } = await api.get("/advert");
            const jpg = "data:image/jpg;base64," + data.jpg;
            localStorage.setItem("advert.time", data.mtime);
            localStorage.setItem("advert.jpg", jpg);
            setJpg(jpg);
          } else {
            setJpg(localStorage.getItem("advert.jpg"));
          }
        }
      } catch (err) {
        setLoading({ status: false })
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function handleChangejpg(e) {
    setLoading({ status: true, message: 'carregando arquivo' })
    const file = getJpg(e.target.files);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result === jpg) {
        setLoading({ status: true, message: 'Este arquivo já está carregado', ico: 'pulse' })
        setTimeout(() => setLoading({ status: false }, 1000));
      }
      setJpg(reader.result);
    };
    reader.readAsDataURL(file);

    function getJpg(inputFiles) {
      if (inputFiles.length !== 0) {
        for (let i = 0; i < inputFiles.length; i++) {
          if ([ "image/jpg", "image/jpeg" ].indexOf(inputFiles[ i ].type) !== -1)
            return inputFiles[ i ];
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
            accept="image/jpeg"
            onChange={handleChangejpg}
            id="file"
            name="file"
          />
          <input type="submit" value="Upload" />
        </form>
        <embed
          width="100%"
          src={jpg}
          type="image/jpg"
          onChange={() => setTimeout(() => setLoading({ status: false }, 1000))}
          onLoad={() => setLoading({ status: false })}
        />
      </Section>
    </>
  );
}
