import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import axios from 'axios';

function App() {

  //State de la app
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const consultarApi = async () => {
      //esta es la primera carga del componente se hace esto para que no retorne niguna consulta
      if (busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '16446448-e873075e505140534b72fb6b7';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`

      const respuesta = await axios.get(url);

      console.log(respuesta.data.hits)
    }
    consultarApi();
  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
    </div>
  );
}

export default App;
