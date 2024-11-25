import { Outlet, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import GenerarZKP from './Componentes/GenerarZKP';
import RepoCliente from './Componentes/RepoCliente';
import AgregarCliente from './Componentes/AgregarCliente';
import AgregarProducto from './Componentes/AgregarProducto';


const Banco = ({infoContratos})=>{

    const [usuario, setUsuario] = useState({
        nombre: null,
        nit: null,
        clave: null,
        generada: null,
    });

    const [contratoActual, setContratoActual] = useState({
        provider: null,
        signer: null,
        contract: null,
      })


    useEffect(() => {

        const getBankInfo = async ()=>{

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
                
            const contract = new ethers.Contract(
                infoContratos.banco[0],
                infoContratos.banco[1],
                signer,
            );

            const resultado = await contract.darInfo();
            console.log("=========");
            console.log(resultado);
            console.log("=========");

            const nombre = resultado[0];
            const nit = resultado[1];
            const clave = resultado[2];
            const generada = resultado[3];

            setUsuario({nombre, nit, clave, generada});

            setContratoActual({
                provider: provider,
                signer: signer,
                contract: contract,
            });

            console.log(usuario);
        }

        getBankInfo();
    }, []);
    
    
    return <>
        <Navbar/>
        
        <br></br>
        <br></br>
        <br></br>

        <Perfil usuario={usuario}/> 
        <Outlet />

        <Routes>
          <Route path="/generar-zkp" element={<GenerarZKP infoContratos={infoContratos}/>}/>
          <Route path="/reportar-cliente" element={<RepoCliente/>}/>
          <Route path="/nuevo-cliente" element={<AgregarCliente infoContratos={infoContratos}/>}/>
          <Route path="/nuevo-producto" element={<AgregarProducto infoContratos={infoContratos}/>}/>
        </Routes>
    </>
}
export default Banco;


const Perfil = ({usuario})=>{

    return <>
        <h2> Mi Perfil </h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> {""+usuario.nombre} </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        NIT: {""+usuario.nit}
                    </div>
                    <div className="row">
                        Zkp generada: {""+usuario.generada}
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </>
}