/* ========================================= 
		PUNTO DE ENTRADA DE LA APLICACIÓN
Mostramos en la consola un mensaje que nos permite comprobar que main.js se está cargando correctamente desde nuestro index.html
========================================= */
//IMPORTACIONES
//validadores, helpers, y formateadores
import { validarCampoObligatorio, validarMonto } from "./utils/validators.js";
//funcion auxiliar encargada de generar identificadores
import { generarId } from "./utils/helpers.js";
//funciones utilizadas para preparar los datos
import {
  formatCurrency,
  formatDate,
  formatAccountNumber,
} from "./utils/formatters.js";

import { Usuario } from "./models/Usuario.js";
import { Cuenta } from "./models/Cuenta.js";
import { Movimiento } from "./models/Movimiento.js";
import { Banco } from "./models/Banco.js";
//importar servicio de persistencia
import { STORAGE_KEYS, storageService } from "./services/StorageService.js";
//CARGAR BANCO PERSISTIDO
const bancoDemo = cargarBanco();
//BLOQUE DE INICIALIZACION
if (bancoDemo.usuarios.length === 0) {
  //CREAR USUARIO INICIAL
  const usuarioDemo = new Usuario({
    nombre: "Juan Suarez",
    email: "juan@correo.com",
    telefono: "5512345678",
    password: "123456",
  });

  //REGISTRAR USUARIO
  bancoDemo.agregarUsuario(usuarioDemo);

  //CREAR CUENTA INICIAL
  const cuentaDemo = new Cuenta({
    numeroCuenta: "123456789012",
    usuarioId: usuarioDemo.id,
  });
  //REGISTAR CUENTA
  bancoDemo.agregarCuenta(cuentaDemo);

  //REALIZAR DEPOSITO INICIAL
  bancoDemo.realizarDeposito(cuentaDemo.id, 1000, "Depósito inicial");

  //GUARDAR BANCO
  guardarBanco(bancoDemo);
}
//MOSTRAR BANCO RECUPERADO
console.log("Banco recuperado: ", bancoDemo);
//MOSTRAR USUARIOS
console.log("Usuarios almacenados: ", bancoDemo.usuarios);
//MOSTRAR CUENTAS
console.log("Cuentas almacenadas: ", bancoDemo.cuentas);
//MOSTRAR MOVIMIENTOS
console.log("Movimientos almacenados: ", bancoDemo.movimientos);
//OBTENER PRIMERA CUENTA
const cuentaPrincipal = bancoDemo.cuentas[0] || null;

//MOSTRAR SALDO PERSISTIDO
if (cuentaPrincipal) {
  console.log("Saldo persistido: ", formatCurrency(cuentaPrincipal.saldo));
}
//COMPROBAR INSTANCIA NUEVA
if (cuentaPrincipal) {
  console.log(
    "La cuenta recuperada sigue siendo una instancia de Cuenta?",
    cuentaPrincipal instanceof Cuenta,
  );
  //function -  instancia funcional de cuenta
  console.log(typeof cuentaPrincipal.depositar);
}

// ==========================================
// PRUEBA DE REGLA NEGATIVA
// ==========================================

try {
  bancoDemo.realizarDeposito(cuentaDemo.id, -500);
} catch (error) {
  console.log("Error controlado AQUIII:", error.message);
}

//GUARDAR ESTADO DEL BANCO
function guardarBanco(banco) {
  //guardar usuarios
  storageService.guardar(STORAGE_KEYS.USUARIOS, banco.usuarios);
  //guardar cuentas
  storageService.guardar(STORAGE_KEYS.CUENTAS, banco.cuentas);
  //guardar movimientos
  storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, banco.movimientos);
}

//CARGAR BANCO
function cargarBanco() {
  //recuperar usuarios
  const usuariosGuardados = storageService.obtener(STORAGE_KEYS.USUARIOS, []);
  //recuperar cuentaas
  const cuentasGuardadas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);
  //recuperar movimientos
  const movimientosGuardados = storageService.obtener(
    STORAGE_KEYS.MOVIMIENTOS,
    [],
  );
  //RECONSTRUIR USUARIOS
  //rehidratacion o recontruccion de instancias
  const usuarios = usuariosGuardados.map((usuario) => new Usuario(usuario));
  //RECONSTRUIR CUENTAS
  const cuentas = cuentasGuardadas.map(
    (movimiento) => new Movimiento(movimiento),
  );
  //RECONSTRUIR MOVIMIENTOS
  const movimientos = movimientosGuardados.map(
    (movimiento) => new Movimiento(movimiento),
  );
  //CREAR NUEVAMENTE EL BANCO
  return new Banco({
    usuarios,
    cuentas,
    movimientos,
  });
}

console.log(storageService.guardar('pruebaTemporar',{mensaje: 'hola'}))
console.log(storageService.obtener('pruebaTemporar',null))
storageService.eliminar('pruebaTemporar')
console.log(storageService.obtener('pruebaTemporar',null))