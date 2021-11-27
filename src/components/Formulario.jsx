import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export const Formulario = ({crearCita}) => {

    //Crear State de citas
    const [cita,actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    const [ error, actualizarError] = useState(false);


    //Se ejecuta por cada uno que el usuario escribe en los input
    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer valores
    const {mascota,propietario,sintomas,fecha,hora} = cita;

    //Cuando el usuario envia la cita
    const submitCita = (e) => {
        e.preventDefault();
        
        //validar
        if(mascota.trim()=== '' || propietario.trim()=== ''
         || fecha.trim()=== '' || hora.trim()=== '' || sintomas.trim()=== ''   ){
            actualizarError(true);
            return;
        }
        //Eliminar el mensaje previo 
        actualizarError(false);
        //Asignar Id, se crea  el id
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })
        console.log('Enviando form');
    }

    return (
        <>
           <h2>Crear Cita</h2> 
           {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
           <form onSubmit= {submitCita} >
               <label>Nombre Mascota</label>
               <input type="text"
                      name="mascota"
                      className="u-full-width"
                      placeholder="Nombre de la Mascota"
                      onChange={actualizarState}
                      value={mascota} />
                <label>Nombre Dueño</label>
                <input type="text"
                      name="propietario"
                      className="u-full-width"
                      placeholder="Nombre del propietario"
                      onChange={actualizarState}
                      value={propietario} />

                <label>Fecha</label>
                <input type="date"
                      name="fecha"
                      className="u-full-width"
                      onChange={actualizarState}
                      value={fecha} />

                <label>Hora</label>
                <input type="time"
                      name="hora"
                      className="u-full-width" 
                      onChange={actualizarState}
                      value={hora} />

                <label>Sintomas</label>
                <textarea name="sintomas" 
                          className="u-full-width" 
                          onChange={actualizarState}
                          value={sintomas} >    
                </textarea>
                <button type="submit"
                        className="u-full-width button-primary">Agregar cita</button>
           </form>
        </>
    )
}
