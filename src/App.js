import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import axios from 'axios';

function App() {

  //State de la app
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      //esta es la primera carga del componente se hace esto para que no retorne niguna consulta
      if (busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '16446448-e873075e505140534b72fb6b7';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`

      const respuesta = await axios.get(url);

      setImagenes(respuesta.data.hits)

      //calcular el total de paginas 
      const calcularTotalPaginas = Math.ceil(respuesta.data.totalHits / imagenesPorPagina);

      setTotalPaginas(calcularTotalPaginas)


    }
    consultarApi();
  }, [busqueda])

  //Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    //para no pasar a numeros negativos 
    if (nuevaPaginaActual === 0) return;

    setPaginaActual(nuevaPaginaActual)
  }

  //Definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;

    //para indicar cuando es la utlima pagina
    if (nuevaPaginaActual > totalPaginas) return;

    setPaginaActual(nuevaPaginaActual)
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}
        >Anterior &laquo;</button>
        <button
          type="button"
          className="bbtn btn-info"
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
      </div>
    </div>
  );
}

export default App;
