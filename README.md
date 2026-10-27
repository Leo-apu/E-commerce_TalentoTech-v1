# 🛍️ Mi Ecommerce - Tienda Online

![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-10.14-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-v7-ca4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

Plataforma de comercio electrónico integral, moderna, rápida y 100% responsiva desarrollada con el ecosistema de **React 18**, **Vite** y **Firebase** (Cloud Firestore & Firebase Authentication). Cuenta con catálogo dinámico conectado a base de datos en la nube, panel de administración con CRUD completo de productos (alta, edición, eliminación y subida de imágenes a ImgBB), arquitectura con separación estricta de layouts (`PublicLayout` y `AdminLayout`), autenticación con control de roles mediante rutas protegidas (`ProtectedRoute`), lista interactiva de favoritos, perfil de usuario personalizable y carrito de compras con persistencia global.

Proyecto desarrollado para el curso de **Desarrollo Frontend con React** en **Talento Tech**.

- **Autor:** Leandro Victorino Cruz
- **Tecnologías principales:** React 18, Vite 5, React Router DOM v7, Firebase 10 (Auth & Firestore), Context API, CSS Modules, React Paginate, React Hot Toast, React Icons, API ImgBB.

---

## 🚀 Despliegue en Vivo y Repositorio

- **Sitio Web en Producción (Vercel):** [https://ecommerce-talentotech-v1.vercel.app](https://ecommerce-talentotech-v1.vercel.app)
- **Repositorio en GitHub:** [https://github.com/Leo-apu/E-commerce_TalentoTech-v1](https://github.com/Leo-apu/E-commerce_TalentoTech-v1)

---

## 🔑 Credenciales para Evaluación (Cuentas de Prueba)

Para facilitar la corrección y evaluación de los diferentes roles y permisos del sistema:

| Rol | Correo Electrónico | Contraseña | Permisos y Acceso |
| :--- | :--- | :--- | :--- |
| **Administrador (Cátedra)** | `admin@admin.com` | `admin123` | Acceso irrestricto al panel `/admin` y `/admin/productos` con CRUD completo de inventario (crear productos, editar datos existentes, eliminar registros y actualizar imágenes en la nube). |
| **Cliente de Prueba** | `cliente@ejemplo.com` | `123456` | Navegación del catálogo, favoritos, carrito de compras y gestión de perfil personal. |

> 💡 _También es posible registrar una cuenta nueva en tiempo real desde `/registro` (con subida opcional de avatar a la nube) o iniciar sesión mediante **Google Sign-In**._

---

## 📋 Cuadro de Cumplimiento de Requerimientos de la Entrega

### ✅ 1. Entrega Mínima
- [x] **Todo lo visto hasta Pre-Entrega:** Catálogo de productos, vista de detalle con selector de unidades y carrito global con Context API (`CartContext`).
- [x] **Vista de productos en carrito:** Página dedicada `/carrito` con desglose por ítem, modificación de cantidades, vaciado, cálculo de envío dinámico y panel lateral rápido (`CartDrawer`).
- [x] **Componente de alta de productos funcionando:** Modal interactivo [`FormularioProductoModal.jsx`](./src/pages/Admin/components/FormularioProductoModal.jsx) para agregar artículos con validación de entradas y subida de imagen a la nube vía ImgBB.
- [x] **Conexión en tiempo real con Firebase Firestore:** Tanto [`ItemListContainer`](./src/pages/ItemListContainer/ItemListContainer.jsx) como [`ItemDetailContainer`](./src/pages/ItemDetailContainer/ItemDetailContainer.jsx) consultan directamente la base de datos de Cloud Firestore. Cualquier alta o modificación realizada desde el panel de administración se refleja de inmediato en la tienda pública sin recargar datos estáticos.
- [x] **Configuración para producción:** Archivo [`vercel.json`](./vercel.json) en la raíz con reglas de reescritura (*rewrites*) para garantizar que rutas directas (`/admin`, `/carrito`, `/productos`) no arrojen error 404 al recargar el navegador en Vercel.

### ✅ 2. Entrega Completa
- [x] **Separación de layouts:** Implementación limpia y desacoplada de [`PublicLayout.jsx`](./src/layouts/PublicLayout.jsx) (tienda) y [`AdminLayout.jsx`](./src/layouts/AdminLayout.jsx) (panel administrativo).
- [x] **Login para administrador:** Formulario de autenticación en `/login` conectado a Firebase Authentication.
- [x] **Usuario administrador predeterminado:** Usuario oficial configurado con credenciales `admin@admin.com` / `admin123`.
- [x] **AuthContext:** Contexto centralizado con persistencia de sesión (`onAuthStateChanged`), inicio de sesión con email/password, registro con creación de perfil en Firestore y soporte para Google.
- [x] **ProtectedRoute:** Componente de seguridad [`ProtectedRoute.jsx`](./src/components/common/ProtectedRoute/ProtectedRoute.jsx) que protege el dashboard y el formulario de productos, restringiendo el paso a usuarios no autenticados o sin rol de administrador.

### ⭐ 3. Extras Opcionales (CRUD Completo de Catálogo)
- [x] **Editar productos:** Edición reactiva de título, precio, categoría, descripción y stock mediante modal con precarga de datos.
- [x] **Eliminar productos:** Eliminación definitiva de documentos en Firestore con confirmación interactiva.
- [x] **Dashboard administrativo:** Resumen de métricas comerciales, estado de inventario y alertas de stock bajo.

---

## 📌 Arquitectura y Funcionalidades del Sistema en Detalle

### 1. 🔐 Sistema de Autenticación y Usuarios (`AuthContext.jsx`)
- **Integración con Firebase Authentication:** Manejo de sesiones seguras mediante el SDK oficial de Firebase con los métodos `signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, `signInWithPopup` (Google) y `signOut`.
- **Persistencia y Sincronización en Tiempo Real:** El hook `onAuthStateChanged` mantiene la sesión sincronizada en la aplicación y recupera el perfil extendido del usuario desde la colección `users` de Cloud Firestore.
- **Control de Roles:** Cada usuario posee un rol asignado (`admin` o `cliente`). El contexto expone los datos del usuario autenticado a toda la jerarquía de componentes.
- **Componentes de Autenticación:**
  - `LoginForm`: Formulario de acceso con alternancia de visibilidad de contraseña, validaciones dinámicas y redirección inteligente según permisos.
  - `RegisterForm`: Formulario de registro con previsualización en tiempo real de avatar, opción de eliminar foto y subida automática a la nube.
  - `UserDropdown`: Menú interactivo en el `Navbar` que detecta el estado de sesión: muestra avatar, nombre, rol, accesos directos a "Mi Perfil", panel "/admin" (exclusivo para administradores) y botón de cierre de sesión.

### 2. 🛡️ Arquitectura de Layouts y Rutas Protegidas
- **`PublicLayout` ([`src/layouts/PublicLayout.jsx`](./src/layouts/PublicLayout.jsx)):**
  - Envuelve la experiencia de compra del cliente.
  - Integra la barra superior de avisos (`Header`), la barra de navegación principal (`Navbar`), el cajón lateral del carrito (`CartDrawer`), la zona de contenido dinámico (`<Outlet />`) y el pie de página (`Footer`).
- **`AdminLayout` ([`src/layouts/AdminLayout.jsx`](./src/layouts/AdminLayout.jsx)):**
  - Layout dedicado para la administración de la tienda.
  - Cuenta con una barra lateral (*sidebar*) con enlaces a Dashboard, Productos, Pedidos y Clientes, cabecera con perfil del administrador activo y botón de salida rápida a la tienda.
- **`ProtectedRoute` ([`src/components/common/ProtectedRoute/ProtectedRoute.jsx`](./src/components/common/ProtectedRoute/ProtectedRoute.jsx)):**
  - Evalúa tres estados: carga inicial (`loading`), existencia de sesión activa (`user`) y verificación de rol (`allowedRoles={["admin"]}`).
  - Redirige a `/login` si no hay sesión, o a la portada pública si el usuario no cuenta con los privilegios necesarios.

### 3. 📦 Catálogo Conectado a Cloud Firestore en Tiempo Real
- **Fuente de Datos en la Nube:** Migración completa de archivos JSON locales a colecciones nativas de Cloud Firestore (`productos` y `users`).
- **`ItemListContainer`:**
  - Consulta los documentos mediante `getDocs()`.
  - Soporta filtrado por categoría (`/categoria/:categoria`) utilizando la cláusula `where("categoria", "==", categoria)`.
  - Manejo de estados de carga (spinner CSS), contingencias ante lista vacía y captura de errores con reintento.
- **`ItemDetailContainer`:**
  - Obtiene el documento específico por ID mediante `getDoc(doc(db, "productos", id))`.
  - Vista detallada con selector de cantidad, cálculo de cuotas sin interés, sellos de confianza y botón para agregar al carrito o favoritos.
- **Paginación Reactiva (`react-paginate`):**
  - Catálogo dividido en páginas de **12 productos**.
  - Controles de navegación *Anterior* / *Siguiente*, botones numéricos y scroll suave automático al inicio.
  - **Preservación del Estado de Navegación:** Recuerda la página en la que se encontraba el usuario al regresar desde el detalle (`location.state`).

### 4. ⚙️ Panel de Administración y CRUD de Productos
- **Dashboard Principal (`/admin`):** Métricas comerciales (ventas estimadas, pedidos activos, clientes registrados, total de ítems en catálogo) y lista de productos con alerta de stock crítico.
- **Gestión de Catálogo (`/admin/productos`):**
  - Tabla de productos con imágenes en miniatura, SKU/ID, categorías, precios formateados en pesos argentinos (`$ ARS`), stock y acciones.
  - Filtros rápidos por categoría y barra de búsqueda en tiempo real por título de producto.
- **Modal de Alta y Edición (`FormularioProductoModal.jsx`):**
  - Modal accesible para crear nuevos productos o editar existentes.
  - Validación de campos requeridos (título, precio numérico, categoría, descripción, stock).
  - Subida de imagen local con previsualización inmediata y carga a **ImgBB**.
- **Eliminación Segura:** Borrado físico en Cloud Firestore mediante `deleteDoc` con diálogo de confirmación.

### 5. 🛒 Carrito de Compras Dual (`CartContext.jsx`)
- **Estado Global Reactivo:** Contexto unificado que gestiona artículos, cantidades, subtotales, cálculo de total general y persistencia en `localStorage`.
- **Métodos del Contexto:** `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `isInCart`, `totalPrice`, `totalItems`.
- **CartWidget:** Indicador en el `Navbar` con contador reactivo de unidades agregadas.
- **CartDrawer:** Cajón lateral deslizante para revisar compras rápidamente sin abandonar la página actual, con barra interactiva de progreso hacia el beneficio de **Envío Gratis** (a partir de $50.000).
- **Página Modular de Carrito (`/carrito`):**
  - `CartEmpty`: Vista de contingencia amigable cuando no hay artículos, con acceso directo al catálogo.
  - `CartContent`: Desglose pormenorizado de productos, controles incrementales (+ / -), resumen de costos, sellos de seguridad y acceso al checkout.

### 6. ❤️ Sistema de Favoritos (`Favoritos.jsx`)
- Guardado persistente de productos preferidos haciendo clic en el icono de corazón en tarjetas o fichas de producto.
- Contador de favoritos en la barra de navegación.
- Vista dedicada `/favoritos` para revisar artículos guardados, eliminarlos o transferirlos directamente al carrito.

### 7. 👤 Perfil de Usuario Completo (`ProfilePage.jsx`)
- **Avatar Interactivo con la Nube:** Permite actualizar la foto de perfil seleccionando una imagen local que se sube automáticamente a ImgBB, impactando de inmediato en Firestore y en el menú de usuario.
- **Pestañas de Navegación:**
  - **Datos Personales:** Nombre completo, email, teléfono, DNI y rol asignado.
  - **Direcciones:** Dirección de entrega registrada (calle, ciudad, provincia y código postal).
  - **Configuración:** Preferencias de cuenta y seguridad.
  - **Mis Pedidos:** Historial de compras asociadas al usuario.

### 8. ☁️ Subida Asíncrona de Imágenes a ImgBB (`imgbbService.js`)
- Servicio desacoplado para el alojamiento de imágenes en la nube de **ImgBB** (`https://api.imgbb.com/1/upload`).
- Envío multipart vía `FormData` autenticado con API Key por variable de entorno (`VITE_IMGBB_API_KEY`).
- Validación previa de formato (JPG, PNG, WebP) y peso máximo (5 MB).

---

## 🛠️ Tecnologías y Librerías Utilizadas

| Tecnología | Propósito |
| :--- | :--- |
| **[React 18](https://react.dev/)** | Biblioteca principal para interfaces de usuario declarativas basadas en componentes |
| **[Vite 5](https://vitejs.dev/)** | Entorno de desarrollo ultrarrápido y empaquetador para producción |
| **[Firebase 10](https://firebase.google.com/)** | Backend Serverless: Cloud Firestore (Base de datos NoSQL) y Firebase Auth (Autenticación) |
| **[React Router DOM v7](https://reactrouter.com/)** | Enrutamiento SPA con soporte para layouts anidados y rutas protegidas |
| **[React Paginate](https://github.com/AdeleD/react-paginate)** | Paginación interactiva y accesible para listas de productos |
| **[React Hot Toast](https://react-hot-toast.com/)** | Sistema de notificaciones emergentes contextuales y estilizadas |
| **[React Icons](https://react-icons.github.io/react-icons/)** | Iconografía vectorial moderna basada en Feather Icons (`Fi`) y FontAwesome (`Fa`) |
| **[ImgBB API](https://api.imgbb.com/)** | Servicio en la nube para almacenamiento y hosting de imágenes |
| **[CSS Modules](https://github.com/css-modules/css-modules)** | Estilos modulares encapsulados por componente, garantizando cero colisiones |

---

## 🗺️ Mapa de Rutas de la Aplicación

### Rutas de la Tienda (Bajo `PublicLayout`)
| Ruta | Componente | Descripción |
| :--- | :--- | :--- |
| `/` | `HomePage` | Portada con Hero Banner, barra de beneficios, categorías destacadas y catálogo inicial |
| `/productos` | `ItemListContainer` | Catálogo completo con paginación interactiva (12 productos por página) |
| `/categoria/:categoria` | `ItemListContainer` | Catálogo filtrado por categoría (`tecnologia`, `indumentaria`, `accesorios`) |
| `/producto/:id` | `ItemDetailContainer` | Detalle del producto con selector de cantidad, cuotas, sellos de garantía y favoritos |
| `/carrito` | `CartPage` | Página de resumen de compra, control de cantidades y progreso de envío gratis |
| `/favoritos` | `Favoritos` | Listado de productos guardados por el usuario con opción de compra rápida |
| `/login` | `Login` | Formulario de inicio de sesión con email/contraseña y acceso con Google |
| `/registro` | `RegisterPage` | Formulario de registro con carga opcional de foto de perfil a ImgBB |
| `/perfil` | `ProfilePage` | Panel de usuario protegido (Mis Pedidos, Datos Personales, Direcciones) |
| `*` | `NotFoundPage` | Página 404 personalizada para URLs inexistentes |

### Rutas de Administración (Bajo `AdminLayout` y `ProtectedRoute`)
| Ruta | Componente | Descripción |
| :--- | :--- | :--- |
| `/admin` | `AdminDashboardPage` | Dashboard principal con métricas comerciales y resumen de catálogo |
| `/admin/productos` | `AdminProductosPage` | Tabla de gestión de productos: alta, edición con modal, borrado y filtros |
| `/admin/pedidos` | `AdminDashboardPage` | Vista administrativa de órdenes y pedidos |
| `/admin/clientes` | `AdminDashboardPage` | Directorio de clientes registrados |

---

## 📂 Estructura del Proyecto

```text
ecommerce/
├── public/
│   ├── productos.json             # Catálogo de respaldo inicial
│   └── usuarios.json              # Mock inicial de usuarios
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm/         # Componente de formulario de inicio de sesión
│   │   │   └── RegisterForm/      # Componente de formulario de registro con carga de avatar
│   │   ├── common/
│   │   │   ├── Pagination/        # Componente de paginación reactiva
│   │   │   ├── ProtectedRoute/    # Guardián de rutas por autenticación y roles
│   │   │   └── ScrollToTop/       # Restablecimiento de scroll al navegar
│   │   ├── home/
│   │   │   ├── Banner/            # Carrusel principal de ofertas
│   │   │   ├── BeneficiosBar/     # Barra de ventajas comerciales (envíos, cuotas, garantías)
│   │   │   └── CategoriasDestacadas/ # Accesos directos a categorías principales
│   │   ├── layout/
│   │   │   ├── CartDrawer/        # Carrito lateral interactivo con barra de envío gratis
│   │   │   ├── CartWidget/        # Icono con badge numérico para el Navbar
│   │   │   ├── Footer/            # Pie de página y enlaces institucionales
│   │   │   ├── Header/            # Barra superior de anuncios
│   │   │   ├── Navbar/            # Barra de navegación principal y buscador
│   │   │   └── UserDropdown/      # Menú desplegable de usuario (perfil / logout / login)
│   │   └── product/
│   │       ├── Item/              # Tarjeta de producto con precio, cuotas y favoritos
│   │       ├── ItemDetail/        # Ficha técnica visual con selector de unidades y badges
│   │       └── ItemList/          # Cuadrícula de productos con paginación integrada
│   ├── context/
│   │   ├── AuthContext.jsx        # Estado global de sesión con Firebase Auth y Firestore
│   │   └── CartContext.jsx        # Estado global del carrito (Context API + localStorage)
│   ├── firebase/
│   │   └── config.js              # Inicialización y configuración de Firebase (Auth, Firestore)
│   ├── layouts/
│   │   ├── PublicLayout.jsx       # Layout maestro de la tienda pública (Header, Navbar, Drawer, Footer)
│   │   ├── AdminLayout.jsx        # Layout para el panel de administración con barra lateral
│   │   └── AdminLayout.module.css # Estilos modulares del panel de administración
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── components/        # Modal de alta/edición, tabla y filtros de productos
│   │   │   ├── AdminDashboardPage.jsx # Panel principal con métricas
│   │   │   └── AdminProductosPage.jsx  # Gestión completa de productos
│   │   ├── Cart/                  # Página de carrito (CartPage, CartContent, CartEmpty, CartItem, CartSummary)
│   │   ├── Favoritos/             # Vista de favoritos guardados
│   │   ├── Home/                  # Portada de la tienda
│   │   ├── ItemDetailContainer/   # Detalle de producto conectado a Firestore
│   │   ├── ItemListContainer/     # Catálogo con filtrado por categoría conectado a Firestore
│   │   ├── Login/                 # Página de acceso
│   │   ├── NotFound/              # Página 404 personalizada
│   │   ├── Profile/               # Panel de perfil con pestañas (datos, direcciones, pedidos)
│   │   └── Register/              # Página de registro
│   ├── services/
│   │   └── imgbbService.js        # Integración con la API cloud de ImgBB para subida de imágenes
│   ├── utils/
│   │   └── validateForm.js        # Validaciones de formularios, contraseñas y archivos
│   ├── App.jsx                    # Configuración central de rutas y Providers
│   ├── index.css                  # Variables CSS, tokens de diseño y reset global
│   └── main.jsx                   # Punto de entrada de la aplicación
├── .env.example                   # Plantilla de variables de entorno requeridas
├── index.html                     # Plantilla HTML con tipografías y metadatos
├── package.json                   # Dependencias y scripts del proyecto
├── vercel.json                    # Configuración de rewrites para Single Page Application en Vercel
└── vite.config.js                 # Configuración del empaquetador Vite
```

---

## 💻 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Leo-apu/E-commerce_TalentoTech-v1.git
cd E-commerce_TalentoTech-v1
```

### 2. Instalar dependencias
```bash
pnpm install
# o con npm:
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
```bash
cp .env.example .env
```

Configura tu clave gratuita de la API de ImgBB ([https://api.imgbb.com/](https://api.imgbb.com/)):
```env
VITE_IMGBB_API_KEY=tu_api_key_aqui
```

### 4. Iniciar el servidor de desarrollo
```bash
pnpm dev
# o con npm:
npm run dev
```
Abre en tu navegador la dirección indicada en consola (por defecto: `http://localhost:5173`).

### 5. Compilación para producción
```bash
pnpm build
# o con npm:
npm run build
```

Para previsualizar el bundle compilado localmente:
```bash
pnpm preview
```

---

## 👨‍💻 Autor

- **Leandro Victorino Cruz**
- Curso: **Desarrollo Frontend con React** — _Talento Tech_
- Año: 2026
