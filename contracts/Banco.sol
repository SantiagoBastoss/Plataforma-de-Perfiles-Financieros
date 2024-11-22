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
        string nacimiento;
        string expedicion;
        uint claveIngreso;
    }

    struct Producto{
        string numero;
        string tipo;
        uint saldo;
    }

    mapping(address=>Entidad) public bancos;

    mapping(address=>Cliente[]) public clientes;

    mapping(uint=>Verificacion) public pruebas;

    mapping(uint=>address) public direccionesBancos;

    mapping(address=>mapping(uint=>Producto[])) public productos;


    function registro_banco(string calldata _nombre, uint _nit, uint _clave) external {
        
        bancos[msg.sender] = Entidad(_nombre, _nit, _clave, false);
        direccionesBancos[_nit] = msg.sender;
    }

    //TODO: Hacer cambio a for para registrar todos los clientes (Si no se tiene DB externa)
    function agregar_cliente(string calldata _nombre, uint _documento, string calldata _nacimiento, string calldata _expedicion, uint _claveIngreso) external {

        Cliente memory nuevoCliente = Cliente(_nombre, _documento, _nacimiento, _expedicion, _claveIngreso);
        clientes[msg.sender].push(nuevoCliente);
    }

    function agregar_producto_cliente(uint _cedula, string calldata _numero, string calldata _tipo, uint _saldo) external {

        Producto memory nuevoProducto = Producto(_numero, _tipo, _saldo);
        productos[msg.sender][_cedula].push(nuevoProducto);
    }

    function dar_productos_cliente(uint _cedula, uint _nitIngresado, uint _claveIngresada) external view returns (Producto[] memory listaProductos){

        address dirBanco = direccionesBancos[_nitIngresado];

        if(bancos[dirBanco].pruebaGenerada){
            if(realizar_zkp(_cedula, _nitIngresado, _claveIngresada, dirBanco)){

                listaProductos = productos[dirBanco][_cedula];
            }
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

    function realizar_zkp(uint _cedula, uint _nitIngresado, uint _claveIngresada, address dirBanco) public view returns(bool resultado) {

        Verificacion pruebaBanco = pruebas[_nitIngresado];
        uint _claveReal;

        for(uint i=0; i<clientes[dirBanco].length; i++){

            if(clientes[dirBanco][i].documento == _cedula){
                _claveReal = clientes[dirBanco][i].claveIngreso;
            }
        }
        
        resultado = pruebaBanco.verificar_zkp(_cedula, _claveReal, _claveIngresada);
        return resultado;
    }
}