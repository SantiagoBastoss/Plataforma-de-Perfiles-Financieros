// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.26;

import './Verificacion.sol';


contract Banco{

    string nombre;
    uint public nit;
    uint clave;
    bool pruebaGenerada;
    Verificacion zkp;

    constructor(string memory _nombre, uint _nit, uint _clave){
        nombre = _nombre;
        nit = _nit;
        clave = _clave;
        pruebaGenerada = false;
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

    mapping(address=>Cliente) public clientes;

    mapping(address=>Producto[]) public productos;

    mapping(uint=>address) public direcciones;


    function info_productos(uint _docCliente, uint _claveCliente) external view returns(Producto[] memory prods) {

        if(pruebaGenerada){
            uint256 secret_k = calcular_clave_secreta((_docCliente+nit), _claveCliente, clave);

            if(zkp.realizar_verificacion(secret_k, _docCliente, _claveCliente)){
                prods = productos[msg.sender];
                return (prods);
            }
        }
    }

    function info_cliente(uint _docCliente, uint _claveCliente) external view returns(string memory nom, uint doc, string memory nac, string memory exp) {

        if(pruebaGenerada){
            uint256 secret_k = calcular_clave_secreta((_docCliente+nit), _claveCliente, clave);

            if(zkp.realizar_verificacion(secret_k, _docCliente, _claveCliente)){
                return (clientes[msg.sender].nombre, clientes[msg.sender].documento, clientes[msg.sender].nacimiento, clientes[msg.sender].expedicion);
            } else{
                return ("The ZKP is not yet approved by the bank", secret_k, "", "");
            }
        } else {
            return ("El banco aun no ha desplegado una ZKP propia", 0, "", "");
        }
    }

    function set_prueba() public {
        zkp = new Verificacion(nit, clave);
        pruebaGenerada = true;
    }

    function calcular_clave_secreta(uint _a, uint _b, uint _c) public pure returns (uint256 clave_sec) {

        uint256 a = uint256(_a);
        uint256 b = uint256(_b);
        uint256 c = uint256(_c);

        clave_sec = ((((b+c)*a)+3)+(a+b+c)+((((b+c)*a)+3)*3))*(a+3);
        return clave_sec;
    }

    //TODO: Hacer cambio a for para registrar todos los clientes (Si no se tiene DB externa)
    function agregar_cliente(address dirCliente, string calldata _nombre, uint _documento, string calldata _nacimiento, string calldata _expedicion, uint _claveIngreso) external {
        Cliente memory nuevoCliente = Cliente(_nombre, _documento, _nacimiento, _expedicion, _claveIngreso);
        clientes[dirCliente] = nuevoCliente;
    }

    function agregar_producto(address dirCliente, string calldata _numero, string calldata _tipo, uint _saldo) external {
        Producto memory nuevoProducto = Producto(_numero, _tipo, _saldo);
        productos[dirCliente].push(nuevoProducto);
    }
}