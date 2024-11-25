// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.26;

import './Verificacion.sol';


contract Banco{

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    struct Entidad{
        string nombre;
        uint nit;
        uint clave;
        bool pruebaGenerada;
    }

    struct Cliente{
        string nombre;
        uint documento;
        uint claveIngreso;
    }

    struct Producto{
        uint numero;
        string tipo;
        uint saldo;
    }

    address[] public registrados;

    mapping(address=>Entidad) public bancos;

    mapping(address=>Cliente[]) public clientes;

    mapping(uint=>Verificacion) public pruebas;

    mapping(uint=>address) public direccionesBancos;

    mapping(address=>mapping(uint=>Producto[])) public productos;



    function darInfo() view external returns (Entidad memory infoBanco){
        infoBanco = bancos[msg.sender];
        return infoBanco;
    }

    function registro_banco(string calldata _nombre, uint _nit, uint _clave) external {
        
        bancos[msg.sender] = Entidad(_nombre, _nit, _clave, false);
        direccionesBancos[_nit] = msg.sender;
        registrados.push(msg.sender);
    }

    //TODO: Hacer cambio a for para registrar todos los clientes (Si no se tiene DB externa)
    function agregar_cliente(string calldata _nombre, uint _documento, uint _claveIngreso) external {

        Cliente memory nuevoCliente = Cliente(_nombre, _documento, _claveIngreso);
        clientes[msg.sender].push(nuevoCliente);
    }

    function agregar_producto_cliente(uint _cedula, uint _numero, string calldata _tipo, uint _saldo) external {

        Producto memory nuevoProducto = Producto(_numero, _tipo, _saldo);
        productos[msg.sender][_cedula].push(nuevoProducto);
    }

    function dar_productos_cliente(uint _cedula, uint _claveIngresada, uint _nitIngresado, uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC) view external returns (Producto[] memory listaProductos){

        address dirBanco = direccionesBancos[_nitIngresado];
        bool resultadoZKP = realizar_zkp(_cedula, _claveIngresada, _nitIngresado, _pA, _pB, _pC);

        if(resultadoZKP){
            listaProductos = productos[dirBanco][_cedula];
        }
        return listaProductos;
    }

    function generar_prueba() external payable {
        require(msg.value==20, "El precio para generar una ZKP es de 20 ETH");

        uint nitBanco = bancos[msg.sender].nit;

        Verificacion nueva_prueba = new Verificacion(nitBanco, bancos[msg.sender].clave); 
        pruebas[nitBanco] = nueva_prueba;

        bancos[msg.sender].pruebaGenerada = true;

        owner.transfer(msg.value);
    }

    function realizar_zkp(uint _cedula, uint _claveIngresada, uint _nitIngresado, uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC) public view returns(bool resultado) {

        Verificacion pruebaBanco = pruebas[_nitIngresado];
        address dirBanco = direccionesBancos[_nitIngresado];
        uint claveReal;

        for(uint i=0; i<clientes[dirBanco].length; i++){

            if(clientes[dirBanco][i].documento == _cedula){
                claveReal = clientes[dirBanco][i].claveIngreso;
            }
        }
        
        resultado = pruebaBanco.verificar_zkp(_cedula, claveReal, _claveIngresada, _pA, _pB, _pC);
        return resultado;
    }


    function obtener_verificacion(uint _nit) view external returns (Verificacion prueb){

        prueb = pruebas[_nit];
        return prueb;
    }

    function existe_verificacion(uint _nit) view external returns (bool){

        address direccionBanco = direccionesBancos[_nit];
        
        return bancos[direccionBanco].pruebaGenerada;
    }


    function dar_resultado_esperado(uint _nitIngresado, uint _cedulaUsuario) view external returns (uint){

        address dirBanco = direccionesBancos[_nitIngresado];
        Verificacion pruebaBanco = pruebas[_nitIngresado];
        uint _claveReal;

        for(uint i=0; i<clientes[dirBanco].length; i++){

            if(clientes[dirBanco][i].documento == _cedulaUsuario){
                _claveReal = clientes[dirBanco][i].claveIngreso;
            }
        }

        uint resultadoEsperado = pruebaBanco.dar_clave_secreta(_nitIngresado+_cedulaUsuario, _claveReal);
        
        return resultadoEsperado;
    }

    function bancoRegistrado() view external returns (bool registrado){

        registrado = false;

        for(uint i=0; i<registrados.length; i++){
            if(registrados[i] == msg.sender){
                registrado = true;
            }
        }

        return registrado;
    }
}