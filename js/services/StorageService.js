// CONVERTIR DATOS JAVASCRIPT A TEXTO JSON
//JSON.stringify()
// CONVERTIR TEXTO JSON NUEVAMENTE A JAVASCRIPT
//JSON.parse()

//CLAVES DE ALMACENAMIENTO
//centralizamos los nombres de todas las claves utilizadas por localstorage. asi evitamos escribir cadenas manualmente por todo el proyecto
export const STORAGE_KEYS = {
  USUARIOS: "usuarios",
  CUENTAS: "cuentas",
  MOVIMIENTOS: "movimientos",
  SESION: "sesion",
};

//esta clase centralizara toda la comunicacion con localstorage
class StorageService {
  //GUARDAR INFORMACION
  guardar(clave, valor) {
    //transforma el array en texto
    const valorJSON = JSON.stringify(valor);
    //almacena en navegador
    localStorage.setItem(clave, valorJSON);
  }

  obtener(clave, valorPorDefecto = null) {
    /* getItem() devuelve el contenido almacenado como texto. Si la clave no existe devuelve null. */
    const valor = localStorage.getItem(clave);

    // VALIDAR SI EXISTE INFORMACIÓN
    if (valor === null) {
      return valorPorDefecto;
    }

    // CONVERTIR JSON
    try {
      return JSON.parse(valor);
    } catch (error) {
      //Si el JSON almacenado es inválido, evitamos detener toda la aplicación.
      console.error(
        `No fue posible leer la clave "${clave}" de LocalStorage.`,
        error,
      );
      /* Si ocurre un error regresamos el valor predeterminado. */
      return valorPorDefecto;
    }
  }

  //ELIMINAR INFORMACION
  //Elimina la clave recibida sin afectar el resto de LocalStorage
  eliminar(clave) {
    localStorage.removeItem(clave);
  }

  //LIMPIAR LOCALSTORAGE
  limpiar() {
    //elimina todas las claves de localstorage del sitio
    localStorage.clear();
  }
}

export const storageService = new StorageService();
