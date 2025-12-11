
## 🗓️ Día 1 – Conexión a Supabase y validación

### 🎯 Objetivo
Crear `supabaseClient.js`, validar conexión con la base de datos y explicar el flujo técnico.

### ⚙️ Qué hice
- Implementé archivo `supabaseClient.js` con `createClient()`
- Creé una tabla `departamentos` desde Supabase Studio
- Añadí políticas RLS con `WITH CHECK` y `authenticated`
- Inicié sesión desde código para tener permisos
- Inserté datos exitosamente desde React

### 🚧 Retos encontrados
- Error 404 por nombre mal escrito de tabla
- Error 401 por falta de permisos en RLS
- Error 42601 al escribir política incorrecta con `USING`

### ✅ Resultado
Se logró conexión segura a Supabase, se insertaron registros válidos desde un usuario autenticado, y comprendí cómo manejar políticas y errores de conexión.

### 🧠 Aprendizajes
- Supabase no crea tablas automáticamente
- Las RLS se configuran con `WITH CHECK` para `INSERT`
- Es clave tener un usuario logueado para autenticar peticiones protegidas


## 🗓️ Día 2 y 3 – Formulario de departamentos, estado global y vista pública fecha 01/07/25

### 🎯 Objetivo
Crear `FormularioDepartamento.jsx` para subir información de departamentos (incluyendo imágenes), implementar `addDepartamento()` con Zustand, y conectar la vista pública con los datos.

### ⚙️ Qué hice
- Creé el formulario para agregar departamentos con campos dinámicos
- Implementé subida de imágenes a Supabase Storage
- Usé `FormData` para manejar inputs y archivos
- Conecté el formulario al estado global `departamentosStore` con Zustand
- Implementé `addDepartamentos()` para sincronizar datos
- Rendericé departamentos en la vista pública (`PublicPage.jsx`)
- Usé `useFetchDepartamentos` para cargar datos desde Supabase
- Añadí lógica para mostrar tarjetas con `modoPublico={true}`

### 🚧 Retos encontrados
- Duda sobre si el `useEffect` se activa con cambios internos en arrays (resuelto con contador en Zustand)
- Inicialmente usé estado local en `PublicPage`, pero luego entendí la importancia del estado global para sincronización
- Validaciones de formulario y control de inputs

### ✅ Resultado
Se logró un flujo completo de creación, almacenamiento y visualización de departamentos. Los datos se sincronizan con Supabase y se reflejan tanto en el panel de administrador como en la vista pública.

### 🧠 Aprendizajes
- Zustand permite centralizar el estado y sincronizar vistas
- `useEffect` solo detecta cambios si la referencia cambia (no el contenido interno)
- Es útil usar un contador o timestamp para forzar efectos reactivos
- Separar lógica en hooks (`useFetchDepartamentos`) mejora la reutilización
- El diseño reactivo permite que los cambios se reflejen automáticamente en la UI



## 🗓️ Día 3 extra – Sistema de inicio de sesión con Supabase  fecha 01/07/2025

### 🎯 Objetivo  
Implementar un formulario de inicio de sesión funcional, conectado a Supabase Auth, con validaciones y control de acceso al panel de administrador.

### ⚙️ Qué hice  
- Creé un formulario controlado con campos de correo y contraseña
- Añadí validaciones en tiempo real (campos vacíos, formato de correo, longitud mínima)
- Deshabilité el botón de envío si el formulario está incompleto
- Mostré mensajes dinámicos de error o éxito con colores
- Centralicé la lógica de autenticación en `auth.js` con `handleLogin()`
- Usé `useAuthStore` con Zustand para manejar `isAuthenticated`
- Redirigí al panel de administrador (`/admin`) tras login exitoso
- Traducí errores técnicos de Supabase a mensajes amigables para el usuario

### 🚧 Retos encontrados  
- `setState` es asíncrono, así que `LoginOk` no se actualizaba a tiempo para redirigir
- Solucionado moviendo la redirección dentro de `handleLogin()` para evitar condiciones de carrera
- Aprendí que `useEffect` es mejor para observar cambios de estado booleano si se quiere reaccionar a ellos

### ✅ Resultado  
Se construyó un sistema de login funcional, seguro y con buena experiencia de usuario. El estado global permite proteger rutas y controlar el acceso al panel de administración.

### 🧠 Aprendizajes  
- `setState` no se refleja inmediatamente, por lo que la lógica dependiente debe manejarse con cuidado
- Separar la lógica de autenticación en un archivo externo mejora la organización
- Validar formularios con expresiones regulares es útil para reforzar la seguridad
- Zustand permite manejar el estado de autenticación de forma global y eficiente

### Reflexión personal
Despues de todo esto he aprendido muchas cosas y me gusta saber que aun que llevo solo 3 meses desde que empece a utilizar react, estoy creando algo util, algo real y que les servira a mis paás, esto parece ser el comienzo de proyectos reales y mpas serios, comparando con muchos de los que hacia hace tiempo como inicio de sesión básico, calculadoras, interfaces, animaciones con css, etc. Ahora estoy uniendo muchos conceptos nuevos y busco utilizar nuevas cosas en cada proyecto para evitar quedarme estancado en un solo nivel. Hoy Martes 01 de Julio del 2025, estoy por ir a domri, y maañana empezaré el curso de ciberseguridad con python, empezaré a expandir mis conocimientos a ese campo y solo queda esperar lo mejor.






## 🗓️ Día 6 – Reflexión personal del sprint

### 🧠 3 aprendizajes clave
1. **Zustand me permitió entender cómo sincronizar el estado global entre componentes**, y cómo forzar actualizaciones con contadores o timestamps.
2. **Supabase no solo es una base de datos, sino una plataforma completa con autenticación, storage y políticas de seguridad**, y aprendí a manejar errores comunes como 401 y 42601.
3. **El manejo de formularios con `FormData` y validaciones personalizadas me ayudó a crear interfaces más robustas y seguras**, tanto para usuarios como para administradores.

### 🚧 1 reto importante
- Entender el flujo de autenticación y cómo redirigir al usuario después del login fue un reto. Me di cuenta de que `setState` es asíncrono, y aprendí a manejar la lógica dentro de la función `handleLogin()` para evitar condiciones de carrera.

### 💚 1 cosa que me encantó
- Me encantó ver cómo todo el sistema se conectaba: desde el formulario hasta la vista pública, pasando por Supabase, Zustand y la autenticación. Ver los datos fluir y reflejarse en tiempo real fue muy satisfactorio. ¡Sentí que estaba construyendo algo real!

---

## 🗓️ Día 7 – Revisión final y próximos pasos

### 🔍 Feedback del sprint
- El sprint fue muy bien estructurado. Me permitió avanzar por etapas, resolver errores reales y aplicar buenas prácticas. Terminarlo antes de tiempo me dio confianza en mi ritmo y en mi capacidad para resolver problemas sin atascarme.
- La documentación diaria me ayudó a consolidar lo aprendido y a tener un registro claro de mi progreso.

### 📚 Aprendizajes generales
- Aprendí a trabajar con Supabase de forma segura y eficiente.
- Profundicé en Zustand y su utilidad para manejar estado global.
- Mejoré mi lógica de validación, manejo de errores y diseño de interfaces.
- Entendí cómo separar lógica en hooks y archivos reutilizables.

### 🧭 Plan siguiente
- Empezar con Python desde lo básico, reforzando fundamentos y aplicándolos en proyectos pequeños.
- Enfocar el aprendizaje de Python hacia la ciberseguridad, con proyectos como escáneres de puertos, análisis de IPs y automatización de tareas.
- Continuar con el desarrollo de DevConnect, integrando nuevas funcionalidades como edición de departamentos, panel de control y mejoras visuales.