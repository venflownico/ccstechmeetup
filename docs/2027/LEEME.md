# Hoja de interés 2027

Con esto la web anota en una hoja de Google quién avisa y qué formatos le interesan. Tarda unos 10 minutos.

## Pasos

1. Crea una hoja de Google nueva. Ponle el nombre que quieras.
2. Entra a Extensiones > Apps Script. Borra lo que haya y pega el contenido de `hoja-interes.gs`.
3. En Configuración del proyecto (el engranaje), baja a Propiedades de la secuencia de comandos y agrega una propiedad llamada `SECRETO`. El valor es una clave larga que inventes. Guárdala.
4. Arriba a la derecha pulsa Implementar > Nueva implementación > tipo Aplicación web. Ejecutar como: yo. Quién tiene acceso: cualquiera. Autoriza los permisos cuando Google los pida.
5. Copia la URL que termina en `/exec`.
6. En Vercel, en las variables de entorno del proyecto, agrega:
   - `INTEREST_WEBHOOK_URL` con la URL del paso 5.
   - `INTEREST_WEBHOOK_SECRET` con la misma clave del paso 3.
7. Vuelve a desplegar la web para que tome las variables.

La hoja crea sola las pestañas `visitas` y `avisos` con la primera entrada.

## Si no se configura

- Los avisos igual llegan por Slack, si `SLACK_WEBHOOK_URL` está puesto.
- Las visitas no se cuentan: sin hoja no hay dónde guardarlas.
- Si faltan los dos, la web le dice a la persona que intente de nuevo en un rato.

## Fórmulas útiles

Ponlas en una pestaña nueva, por ejemplo `resumen`. Las pestañas guardan los formatos como texto separado por comas.

Interés por formato (cambia `meetup` por `demo-day`, `dinner`, `wellness` o `hackathon`). Quien marca "todos" queda con todos los formatos visibles, así que cuenta en cada uno:

```
=COUNTIF(avisos!E:E; "*meetup*")
```

Rol por formato (cuántos fundadores eligieron `demo-day`):

```
=COUNTIFS(avisos!D:D; "founder"; avisos!E:E; "*demo-day*")
```

Porcentaje que marca 4 o más formatos (cuenta las comas: 3 comas son 4 formatos):

```
=SUMPRODUCT((LEN(avisos!E2:E)-LEN(SUBSTITUTE(avisos!E2:E; ","; ""))>=3)*1) / COUNTA(avisos!E2:E)
```

Búsqueda por formato marcado. La columna `busca` guarda a quién quiere conocer la persona, según lo que marca en el formulario. Puede marcar de cero a seis y se guardan separados por coma (`inversionista`, `cofounder`, `cliente`, `talento`, `yapaso` o `mentor`; vacía si no marcó ninguna). Cuántos que buscan inversionista marcaron `demo-day`:

```
=COUNTIFS(visitas!F:F; "*inversionista*"; visitas!D:D; "*demo-day*")
```

Cuántas personas buscan un mentor, sin importar qué más marcaron:

```
=COUNTIF(avisos!G:G; "*mentor*")
```

Cuántas marcaron dos o más personas (cuenta las comas: 1 coma son 2):

```
=SUMPRODUCT((LEN(avisos!G2:G)-LEN(SUBSTITUTE(avisos!G2:G; ","; ""))>=1)*1)
```

En `avisos` la columna `busca` es la G y los formatos están en la E. Si tus pestañas ya existían antes de este cambio, escribe `busca` en la celda F1 de `visitas` y en la G1 de `avisos`. Las filas viejas, con un solo id, siguen funcionando con las mismas fórmulas. Ojo: los ids viejos `mentor` (antes «alguien que ya pasó por esto») ahora son `yapaso`.

Si tu hoja usa coma en vez de punto y coma como separador, cambia los `;` por `,`.
