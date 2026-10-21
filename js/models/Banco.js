//IMPORTAR MODELO MOVIMIENTO
import { Movimiento } from "./Movimiento.js";

export class Banco {
  constructor({ usuarios = [], cuentas = [], movimientos = [] } = {}) {
    this.usuarios = usuarios;
    this.cuentas = cuentas;
    this.movimientos = movimientos;
  }

  //AGREGAR USUARIO
  agregarUsuario(usuario) {
    const existe = this.usuarios.some((u) => u.id === usuario.id);
    if (existe) {
      throw new Error("El usuario ya existe");
    }
    this.usuarios.push(usuario);
    return usuario;
  }

  //BUSCAR USUARIO POR ID
  buscarUsuarioPorID(usuarioId) {
    //find devuelve el primer usuario cuyo id coincida
    return this.usuarios.find((usuario) => usuario.id === usuarioId) || null;
  }

  //AGREGAR CUENTA
  agregarCuenta(cuenta) {
    const usuario = this.buscarUsuarioPorID(cuenta.usuarioId);

    if (!usuario) {
      throw new Error("El usuario propietario de la cuenta no existe");
    }

    const existe = this.cuentas.some((c) => c.numero === cuenta.numeroCuenta);

    if (existe) {
      throw new Error("La cuenta ya existe");
    }

    this.cuentas.push(cuenta);
    return cuenta;
  }

  buscarCuentaPorId(cuentaId) {
    return this.cuentas.find((cuenta) => cuenta.id === cuentaId) || null;
  }

  buscarCuentaPorNumero(numeroCuenta) {
    return;
    this.cuentas.find((cuenta) => cuenta.numeroCuenta === numeroCuenta) || null;
  }

  //OBTENER CUENTAS DE UN USUARIO
  obtenerCuentasDeUsuario(usuarioId) {
    return this.cuentas.filter((cuenta) => cuenta.usuarioId === usuarioId);
  }

  //REGISTRAR MOVIMIENTO
  registrarMovimiento(movimiento) {
    this.movimientos.push(movimiento);
    return movimiento;
  }

  //REALIZAR DEPOSITO
  realizarDeposito(cuentaID, monto, descripcion = "") {
    const montoNumerico = Number(monto);
    //validar monto
    if (!Number.isFinite(montoNumerico) || montoNumerico <= 0) {
      throw new Error("Monto invalido, el monto debe ser mayor a cero");
    }
    const cuenta = this.buscarCuentaPorId(cuentaID,);

    //validar cuenta
    if (!cuenta) {
      throw new Error("La cuenta ya existe");
    }

    cuenta.depositar(montoNumerico);
    //vrear movimiento
    const movimiento = new Movimiento({
      tipo: "DEPOSITO",
      monto: montoNumerico,
      descripcion,
      cuentaOrigen: cuenta.id,
      saldoResultante: cuenta.saldo,
    });

    //registrar movimiento
    this.registrarMovimiento(movimiento);
    //retornar movimiento
    return movimiento;
  }
  //obtener movimientos de una cuenta
  obtenerMovimientoDeCuenta(cuentaID) {
    return this.movimientos.filter(
      (movimiento) =>
        movimiento.cuentaOrigen === cuentaID ||
        movimiento.cuentaDestino === cuentaID,
    );
  }
}
