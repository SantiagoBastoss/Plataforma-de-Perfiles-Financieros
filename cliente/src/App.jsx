import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Persona from './components/Persona/Persona';
import Registro from './components/Persona/Registro';
import RegistroBanco from './components/Banco/RegistroBanco';
import Banco from './components/Banco/Banco';

import abiPerfil from '../../artifacts/contracts/Perfil.sol/Perfil.json';
import abiBanco from '../../artifacts/contracts/Banco.sol/Banco.json';
import abiGroth16Verifier from '../../artifacts/contracts/Groth16Verifier.sol/Groth16Verifier.json';
import abiVerificacion from '../../artifacts/contracts/Verificacion.sol/Verificacion.json';



function App() {

  const contratos = {
    perfil: ["0xCceB4474686e2F64aCCF2ED04d037A6cf3C7dD58", abiPerfil.abi],
    banco: ["0x97965Fc1dF07df9b19Be3Dc9cb38834197bfEB9B", abiBanco.abi],
    verifier: ["0x7aF06409208674E18ed634704477685D688ee45a", abiGroth16Verifier.abi],
    verificacion: ["0xF4d02D92e87D4e28f9B6A4e5c01C933056071122", abiVerificacion.abi],
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home contratos={contratos}/>}/>
        <Route path="/persona/registro" element={<Registro contratos={contratos}/>}/>
        <Route path="/persona/*" element={<Persona infoContratos={contratos}/>}/>
        <Route path="/banco/registro" element={<RegistroBanco contratos={contratos}/>}/>
        <Route path="/banco/*" element={<Banco infoContratos={contratos}/>}/>
      </Routes>
    </Router>
  )
}
export default App;