import './App.css'
import Home from './components/Home';
import Persona from './components/Persona/Persona';
import Registro from './components/Persona/Registro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import abiPerfil from '../../artifacts/contracts/Perfil.sol/Perfil.json';
import abiBanco from '../../artifacts/contracts/Banco.sol/Banco.json';
import abiGroth16Verifier from '../../artifacts/contracts/Groth16Verifier.sol/Groth16Verifier.json';
import abiVerificacion from '../../artifacts/contracts/Verificacion.sol/Verificacion.json';


function App() {

  const contratos = {
    perfil: ["0x0E1BA9A49ac0896e8F912a76418e463e26222C9B", abiPerfil.abi],
    banco: ["", abiBanco.abi],
    verifier: ["", abiGroth16Verifier.abi],
    verificacion: ["", abiVerificacion.abi],
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home contratos={contratos}/>}/>
        <Route path="/persona/registro" element={<Registro contratos={contratos}/>}/>
        <Route path="/persona/*" element={<Persona infoContratos={contratos}/>}/>
      </Routes>
    </Router>
  )
}
export default App;