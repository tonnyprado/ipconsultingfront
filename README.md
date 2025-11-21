# Consulta IP – Frontend

Este es el frontend de la página, los dividi en dos repositorios para tener un mejor control de cada uno. Lo construí con React (Create React App) y TailwindCSS. Su propósito es permitir que un usuario ingrese una dirección IP, enviarla a mi backend en Spring Boot y visualizar la información en una tabla, con opciones para ver detalles, aplicar filtros y eliminar registros. Aqui utilicé Netlify en vez de Railway porque aun tenia espacio para deployar otra app en ese hosting y era más facil de deployar que Railway que solo me estaba dificultando más todo y para ahorrarme problema decidi dejar Railway solo para mi backend.

---

## 1. Objetivo del frontend

Mi objetivo con este frontend fue crear una interfaz clara y sencilla que permitiera:

- Ingresar una dirección IP.
- Enviar la IP al backend para que se procese.
- Mostrar los resultados en una tabla.
- Ver más detalles de una IP específica en un modal.
- Aplicar filtros para acotar los resultados.
- Eliminar registros individuales.
- Reiniciar la vista cuando sea necesario.

---

## 2. Proceso de diseño

Antes de programar el frontend, seguí estos pasos:

### 2.1 Boceto en libreta

Primero dibujé en una libreta cómo quería que se viera la interfaz. Ahí definí:

- La barra de entrada de IP.
- Los botones principales (consultar, filtros, reiniciar).
- La tabla de resultados.
- El modal de detalles.

### 2.2 Diseño en Figma

Después pasé ese boceto a un diseño sencillo en Figma. Esto me ayudó a fijar:

- La distribución de los elementos.
- El estilo tipo dashboard.
- La jerarquía visual de la información.

### 2.3 Diagrama de flujo

Luego hice un diagrama de flujo para entender el recorrido completo:

- El usuario ingresa una IP.
- El frontend llama al backend.
- El backend consulta la API externa o la base de datos.
- El backend responde.
- El frontend actualiza la tabla y los estados internos.

---

## 3. Stack utilizado

- React con Create React App
- TailwindCSS
- Axios para las llamadas HTTP
- Netlify para el deploy del frontend

---

## 4. Estructura del proyecto

La estructura principal del código fuente se encuentra en la carpeta `src` y está organizada de la siguiente forma:

- `src/api`
  - `client.js`
  - `ipApi.js`
- `src/assets`
  - `delete.png`
- `src/components`
  - `DetailsModal.jsx`
  - `FiltersModal.jsx`
  - `IpInput.jsx`
  - `IpTable.jsx`
- `src/pages`
  - `LandingPage.jsx`
- Archivos base de Create React App:
  - `App.js`
  - `App.css`
  - `index.js`
  - `index.css`
  - `reportWebVitals.js`
  - `setupTests.js`
- Tailwind:
  - `tailwind.config.js`
- Configuración local:
  - `.env.local`

A continuación explico el rol de cada parte.

---

## 5. Componentes y archivos principales

### 5.1 api/client.js

Aquí configuro el cliente Axios que se conecta al backend. En este archivo:

- Defino la `baseURL` usando la variable de entorno `REACT_APP_API_BASE_URL`.
- Centralizo la configuración para que todos los requests usen el mismo cliente.

### 5.2 api/ipApi.js

En este archivo defino las funciones para comunicarme con el backend:

- Obtener todos los registros de IP.
- Registrar una nueva IP.
- Eliminar una IP.
- Cualquier otra operación específica sobre IPs que necesite el frontend.

De esta forma, el resto de la aplicación solo importa funciones de `ipApi.js` en lugar de crear llamadas Axios directamente.

### 5.3 components/IpInput.jsx

Este componente representa el área donde el usuario ingresa la IP. Sus responsabilidades son:

- Manejar el estado del input de IP.
- Validar el formato básico antes de enviar (si corresponde).
- Llamar a la función de creación/consulta de IP del backend (a través de las funciones importadas desde `ipApi.js`) mediante props o hooks.

### 5.4 components/IpTable.jsx

Este componente muestra la tabla principal de resultados. Sus responsabilidades:

- Recibir la lista de IPs como props.
- Mostrar siempre los encabezados de la tabla aunque todavía no existan registros.
- Renderizar las filas, normalmente usando `map`.
- Disparar acciones cuando se quiere ver detalles o eliminar una IP (por ejemplo, llamando a funciones pasadas por props).

La tabla incluye columnas como:

- IP
- País
- Riesgo
- Acciones (por ejemplo, ver detalles y eliminar)

### 5.5 components/DetailsModal.jsx

Este componente es un modal que muestra el detalle de una IP específica. Se utiliza cuando el usuario quiere ver más información que la mostrada en la tabla. Típicamente incluye:

- Ciudad
- Región
- ISP
- Coordenadas
- Zona horaria
- Nivel de riesgo

Y un botón para cerrar el modal.

### 5.6 components/FiltersModal.jsx

Este componente es un modal para aplicar filtros a los resultados, por ejemplo:

- Filtrar por país
- Filtrar por nivel de riesgo
- Filtrar por tipo de IP u otros campos

Al aplicar los filtros, se actualizan estados en el componente padre (por ejemplo, en `LandingPage.jsx` o `App.js`) y la tabla se vuelve a renderizar con los datos filtrados.

### 5.7 pages/LandingPage.jsx

Este componente actúa como la página principal de la aplicación. Aquí es donde:

- Organizo el layout general.
- Combino `IpInput`, `IpTable`, `DetailsModal` y `FiltersModal`.
- Manejo los estados globales del frontend, como:
  - Lista de IPs.
  - IP seleccionada para ver detalles.
  - Filtros activos.
  - Estados de loading y errores, si los uso.

En muchos casos, `App.js` se limita a renderizar `LandingPage` para mantener la responsabilidad de la página en un solo lugar.

### 5.8 App.js

Es el componente raíz generado por Create React App. En mi estructura, App.js importa y renderiza `LandingPage.jsx`. De esta forma, toda la lógica de la pantalla se concentra en la página principal y App.js se mantiene limpio.

---

## 6. Flujo de datos

El flujo de datos del frontend se puede resumir así:

1. Al cargar la página, hago una llamada al backend para obtener todas las IPs registradas y guardo la lista en el estado.
2. Cuando el usuario ingresa una IP en `IpInput` y la envía:
   - Se llama a una función de `ipApi.js`.
   - El backend procesa la IP (ya sea consultando la API externa o reutilizando registros guardados).
   - El frontend actualiza la tabla con el nuevo registro o con los datos existentes.
3. Si el usuario abre el modal de detalles:
   - Se selecciona una IP de la lista.
   - `DetailsModal` muestra toda la información disponible.
4. Si el usuario abre el modal de filtros:
   - Se configuran criterios de filtrado.
   - Se actualiza la vista para mostrar solo los registros que cumplan los filtros.
5. Si el usuario elimina una IP:
   - Se llama al endpoint correspondiente del backend.
   - Si la eliminación es exitosa, se actualiza el estado para removerla de la tabla.

---

## 7. Variables de entorno

Para la comunicación con el backend utilizo un archivo `.env.local` con la variable:

VITE_API_BASE_URL=http://localhost:8080
donde tengo que cambiarlo a VITE y por alguna razón si funciona igual que con REACT_CREATE

---

## 8. Estilos con TailwindCSS

Integré TailwindCSS en este proyecto para definir estilos mediante clases utilitarias. La configuración principal está en:

- `tailwind.config.js`
- `index.css`

Uso clases de Tailwind para estructurar el layout y estilizar:

- Contenedores, espaciados y alineaciones.
- Tipografía y tamaños de texto.
- Bordes, sombras y fondo de botones, inputs y tablas.
- El modal de detalles y el modal de filtros.

Esto me permitió mantener un diseño consistente con el diseño que preparé en Figma.

---

## 9. Deploy en Netlify

El proceso que seguí para desplegar este frontend fue:

1. Subí el código a un repositorio (por ejemplo, GitHub).
2. Conecté el repositorio a Netlify.
3. Configuré:
   - Comando de build: `npm run build`
   - Carpeta de publicación: `build`
4. Agregué la variable de entorno `REACT_APP_API_BASE_URL` en Netlify, apuntando al backend desplegado en Railway.
5. Hice el deploy y probé la aplicación desde el dominio generado por Netlify.

---

## 10. Orden de trabajo

El orden real en el que trabajé este proyecto fue:

1. Bocetos en libreta.
2. Diseño inicial en Figma.
3. Diagrama de flujo del comportamiento.
4. Desarrollo del frontend (estructura de componentes, tabla, modales).
5. Desarrollo del backend en Spring Boot.
6. Conexión frontend–backend en local usando Axios.
7. Pruebas con el navegador y Postman.
8. Subida de ambos proyectos a repositorios.
9. Deploy del backend en Railway.
10. Deploy del frontend en Netlify.
11. Ajuste de CORS y pruebas finales en producción.

---