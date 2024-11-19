import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Bienvenida from "./Bienvenida";
import { ethers } from "ethers";
import abiPerfil from '../../../artifacts/contracts/Perfil.sol/Perfil.json';

const Persona = ({contrat, changeLoggedFalse})=>{

    const registrarPersona = async () => {

        if(typeof window.ethereum !== "undefined"){

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            console.log(signer);
            const contract = new ethers.Contract(
                "0xd3ebDD76b4Bc0AEdC084bc40C0bbEA24DD4B7028",
                abiPerfil.abi,
                signer,
            );

            const transaction = await contract.registro("Carlos", 10392, "10/10/2003", "10/10/2021", 320434, "carlos@gmail.com");
            await transaction.wait();

            alert("Registro exitoso");

            try {
                
            } catch (error) {
                
            }
        } else {
            alert("Para ingresar al sistema debe primero conectar su cuenta de Metamask");
        }
    }
    
    
    const funPru = async()=>{
        //const [owner] = await ethers.getSigners();
        const hardhatToken = await ethers.deployContract("Perfil");

        const dire = await hardhatToken.getAddress();

        console.log(hardhatToken);
        console.log(dire);
        //const transaction = await contrat.calcular_score();
    }

    return <>
        <Navbar />
        <br></br>
        <br></br>
        <br></br>
        <h1>Titulo prueba</h1>
        <button onClick={registrarPersona}>Prueba Registro</button>
        <div className="column">
            <main className="main-content">
                <Routes>
                    <Route path="/persona/perfil" element={<Perfil />}/>
                    <Route path="/persona/informacion-personal" element={<InfoPersonal />}/>
                    <Route path="/persona/productos-financieros" element={<ProdsFinancieros />}/>
                    <Route path="/persona/historial-de-reportes" element={<HistReportes />}/>
                    <Route path="/persona/notificaciones" element={<Notificaciones />}/>
                </Routes>
        </main> 
        </div>
    </>
}
export default Persona;



const Perfil = ()=>{

    return <>
        <h2> Mi Perfil </h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Nombre </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Andres cARNE
                        Score Bancario
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </>
}


const InfoPersonal = ()=>{

    return <>
        <h2>Información Personal </h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Nombre </div>
                <br></br>
                <div className="card-content"> 
                    Nombre Prueba
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Número de documento </div>
                <br></br>
                <div className="card-content"> 
                    321039201
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Fecha de Nacimiento </div>
                <br></br>
                <div className="card-content"> 
                    10/10/2003
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Fecha de Expedición de la cédula </div>
                <br></br>
                <div className="card-content"> 
                    10/10/2021
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Celular </div>
                <br></br>
                <div className="card-content"> 
                    3201853772
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Correo electrónico </div>
                <br></br>
                <div className="card-content"> 
                    prueba@gmail.com
                </div>
            </div>
        </div>
    </>
}


const ProdsFinancieros = ()=>{

    return <>
        <h2>Productos Financieros</h2>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad </div>
                <br></br>
                <div className="card-content"> 
                    <div className="row">
                        Escriba el NIT de su entidad:
                        <input></input>
                    </div>
                    <br></br>
                    <button>Consultar</button>
                </div>
            </div>
        </div>
        <br></br>
    </>
}


const HistReportes = ()=>{

    return <>
        <h2>Historial de Reportes</h2>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad: Bancolombia </div>
                <br></br>
                <div className="card-content"> 
                    <div className="column">
                        <div className="row">
                            Fecha: 11/08/2024
                        </div>
                        <br></br>
                        <div className="row">
                            Producto: Tarjeta de crédito
                        </div>
                        <br></br>
                        <div className="row">
                            Motivo: Incumplimiento pago de cuotas de manejo
                        </div>
                    </div>
                    <br></br>
                    <button>Detalles</button>
                </div>
            </div>
        </div>
        <br></br>
        <div className="card">
            <div className="card-body">
                <div className="card-title"> Entidad: Banco de Bogotá </div>
                <br></br>
                <div className="card-content"> 
                    <div className="column">
                        <div className="row">
                            Fecha: 23/10/2024
                        </div>
                        <br></br>
                        <div className="row">
                            Producto: CDT
                        </div>
                        <br></br>
                        <div className="row">
                            Motivo: Buen monto ahorrado en CDT
                        </div>
                    </div>
                    <br></br>
                    <button>Detalles</button>
                </div>
            </div>
        </div>
    </>
}

const Notificaciones = ()=>{

    return <>
        <h2>Notificaciones</h2>
    </>
}

const Salir = ({loggen})=>{

    loggen;

    return <>
        <Bienvenida />
    </>
}