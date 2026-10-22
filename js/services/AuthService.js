//AUTENTICACION, SESION, LOGIN, LOGOUT, USUARIO ACTUAL, PROTECCION DE RUTAS
//IMPORTAR STORAGE SERVICE
//AUTHSERVICE NECESITA CONSULTAR LOS USUARIOS REGISTRADOS Y MANEJAR LA SESION ALMACENADA EN LOCALSTORAGE

import { STORAGE_KEYS, storageService } from "./StorageService.js";

//SERVICIO DE AUTENTICACION 
class AuthService {
    //INICIAR SESION 

    //recuperar los usuarios registrados si todavia no existe uno
    login(email, password) {
        const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, [])

        //normalizar correo 
        const emailNormalizado = String(email).trim().toLocaleLowerCase()

        //buscar usuario
        const usuario = usuarios.find(u => u.email.toLocaleLowerCase() === emailNormalizado && u.password === password && u.activo !== false )

        //si las credenciales fueron incorrectas
        if(!usuario) {
            throw new Error('Correo o contraseña incorrectos')
        }
        //crear sesion 
        const sesion = {
            usuarioId: usuario.id,
            fechaInicio: new Date().toISOString()
        }

        //guardar sesion 
        storageService.guardar(STORAGE_KEYS.SESION, sesion)

        return usuario
    }

    //CERRAR SESION
    logout(){
        storageService.eliminar(STORAGE_KEYS.SESION)
    }

    //OBTENER USUARIO ACTUAL
    getCurrentUser(){
        //recuperar sesion 
        const sesion = storageService.obtener(STORAGE_KEYS.SESION, null)

        //validar sesion 
        if(!sesion){
            return null
        }

        //recuperar usuarios
        const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, [])

        //buscar usuario de la sesion
        return ( 
            usuarios.find(u => u.id === sesion.usuarioId) || null
        )
    }

    //PROTEGER RUTA
    //regresa si un usuario esta autenticado
    protegerRuta() {
        //obtener usuario autenticado
        const usuario = this.getCurrentUser()
        if(!usuario) {
            window.location.href = 'index.html'
            return false
        }
        //acceso permitido
        return true
    }
}

//INSTANCIA AUTH SERVICE
export const authService = new AuthService()