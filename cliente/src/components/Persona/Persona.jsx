import { Outlet, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import HistReportes from './Componentes/HistReportes';
import InfoPersonal from './Componentes/InfoPersonal';
import Notificaciones from './Componentes/Notificaciones';
import ProdsFinancieros from './Componentes/ProdsFinancieros';


const Persona = ({infoContratos})=>{

    const [usuario, setUsuario] = useState({
        nombre: null,
        documento: null,
        fechaNacimiento: null,
        fechaExpedicion: null,
        celular: null,
        correo: null,
    });

    const [contratoActual, setContratoActual] = useState({
        provider: null,
        signer: null,
        contract: null,
      })


    useEffect(() => {

        const llama = async ()=>{

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
                
            const contract = new ethers.Contract(
                infoContratos.perfil[0],
                infoContratos.perfil[1],
                signer,
            );

            const resultado = await contract.darInfo();
            console.log("=========");
            console.log(resultado);
            console.log("=========");

            const nombre = resultado[0][0];
            const documento = resultado[0][1];
            const fechaNacimiento = resultado[0][2];
            const fechaExpedicion = resultado[0][3];

            const celular = resultado[1][0];
            const correo = resultado[1][1];

            setUsuario({nombre, documento, fechaNacimiento, fechaExpedicion, celular, correo});

            setContratoActual({
                provider: provider,
                signer: signer,
                contract: contract,
            });

            console.log({usuario});
        }

        llama();
    }, []);
    
    
    return <>
        <Navbar/>
        
        <br></br>
        <br></br>
        <br></br>

        <Perfil usuario={usuario}/> 
        <Outlet />

        <Routes>
          <Route path="/informacion-personal" element={<InfoPersonal user={usuario}/>}/>
          <Route path="/productos-financieros" element={<ProdsFinancieros />}/>
          <Route path="/historial-de-reportes" element={<HistReportes />}/>
          <Route path="/notificaciones" element={<Notificaciones />}/>
        </Routes>
    </>
}
export default Persona;


const Perfil = ({usuario})=>{

    return <>
        <h2> Mi Perfil </h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Nombre </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        {usuario.nombre}
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </>
}