import React, { useState } from 'react';
import Error from './Error'

const Formulario = () => {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState(false)

    const buscarImagenes = e => {
        e.preventDefault()

        //validar 
        if (termino.trim() === '') {
            setError(true)
            return;
        }
        setError(false)

        //Enviar el termino de bsuqueda hacia el componente principal

    }
    return (
        <form
            onSubmit={buscarImagenes}
        >
            {error ? <Error mensaje="Agregar término de búsqueda" /> : null}
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo, futbol o cafe"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
    );
}

export default Formulario;