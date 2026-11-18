// Caracas Tech Meetup 2027: recibe visitas y avisos desde la web y los anota en la hoja.
// Pega este código en Extensiones > Apps Script de tu hoja de Google.
// Antes de implementar, crea la propiedad de script SECRETO (Configuración del proyecto).

var ENCABEZADOS = {
  visitas: ["fecha", "origen", "volteadas", "marcadas", "segundos", "busca"],
  avisos: ["fecha", "origen", "email", "rol", "formatos", "todos", "busca"],
};

function responder_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function pestana_(libro, nombre) {
  var hoja = libro.getSheetByName(nombre);
  if (!hoja) {
    hoja = libro.insertSheet(nombre);
    hoja.appendRow(ENCABEZADOS[nombre]);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function lista_(valor) {
  return Array.isArray(valor) ? valor.join(", ") : "";
}

// busca llega como arreglo (0 a 6 ids); si viene un texto suelto de una versión vieja, se guarda tal cual.
function busca_(valor) {
  return Array.isArray(valor) ? valor.join(", ") : valor || "";
}

function doPost(e) {
  var datos;
  try {
    datos = JSON.parse(e.postData.contents);
  } catch (error) {
    return responder_({ ok: false, error: "JSON inválido" });
  }

  var secreto = PropertiesService.getScriptProperties().getProperty("SECRETO");
  if (!secreto || datos.secreto !== secreto) {
    return responder_({ ok: false, error: "No autorizado" });
  }

  var candado = LockService.getScriptLock();
  candado.waitLock(20000);
  try {
    var libro = SpreadsheetApp.getActiveSpreadsheet();
    if (datos.tipo === "visita") {
      pestana_(libro, "visitas").appendRow([
        datos.fecha,
        datos.origen,
        lista_(datos.volteadas),
        lista_(datos.marcadas),
        datos.segundos,
        busca_(datos.busca),
      ]);
    } else if (datos.tipo === "aviso") {
      pestana_(libro, "avisos").appendRow([
        datos.fecha,
        datos.origen,
        datos.email,
        datos.rol,
        lista_(datos.formatos),
        datos.todos ? "sí" : "no",
        busca_(datos.busca),
      ]);
    } else {
      return responder_({ ok: false, error: "Tipo desconocido" });
    }
    return responder_({ ok: true });
  } finally {
    candado.releaseLock();
  }
}
