import { useState } from 'react'
import './App.css'

import abiPerfil from '../../artifacts/contracts/Perfil.sol/Perfil.json';
import abiBanco from '../../artifacts/contracts/Banco.sol/Banco.json';
import abiGroth16Verifier from '../../artifacts/contracts/Groth16Verifier.sol/Groth16Verifier.json';
import abiVerificacion from '../../artifacts/contracts/Verificacion.sol/Verificacion.json';

import Bienvenida from './components/Home'
import Persona from './components/Persona/Persona';
import Registro from './components/Persona/Registro';
import HistReportes from './components/Persona/Componentes/HistReportes';
import InfoPersonal from './components/Persona/Componentes/InfoPersonal';
import Notificaciones from './components/Persona/Componentes/Notificaciones';
import ProdsFinancieros from './components/Persona/Componentes/ProdsFinancieros';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  //const contratos = {
    //"registro": ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", abiPerfil.abi],
    //"banco": ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", abiPerfil.abi]
  //};


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bienvenida />}/>
        <Route path="persona/registro" element={<Registro />}/>
        <Route path="persona" element={<Persona />}>
          <Route path="informacion-personal" element={<InfoPersonal />}/>
          <Route path="productos-financieros" element={<ProdsFinancieros />}/>
          <Route path="historial-de-reportes" element={<HistReportes />}/>
          <Route path="notificaciones" element={<Notificaciones />}/>
        </Route>
      </Routes>
    </Router>
  )
}
export default App;