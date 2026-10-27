# 🛍️ Mi Ecommerce - Tienda Online

Plataforma de comercio electrónico moderna, rápida y 100% responsiva desarrollada con el ecosistema de **React 18**, **Vite** y **Firebase** (Cloud Firestore & Firebase Authentication). Cuenta con catálogo dinámico en tiempo real, gestión de productos para administradores con subida de imágenes a la nube (ImgBB), autenticación por roles, rutas protegidas, separación de layouts, sistema de favoritos y carrito de compras global.

Proyecto desarrollado para el curso de **Desarrollo Frontend con React** en **Talento Tech**.

- **Autor:** Leandro Victorino Cruz  
- **Tecnologías principales:** React 18, Vite, React Router DOM v7, Firebase 10 (Auth & Firestore), Context API, CSS Modules, React Paginate, React Hot Toast, React Icons, API ImgBB.

---

## 🚀 Despliegue en Vivo y Repositorio

- **Sitio Web (Deploy en Vercel):** [https://ecommerce-talentotech-v1.vercel.app](https://ecommerce-talentotech-v1.vercel.app)
- **Repositorio en GitHub:** [https://github.com/Leo-apu/E-commerce_TalentoTech-v1](https://github.com/Leo-apu/E-commerce_TalentoTech-v1)

---

## 🔑 Credenciales para Evaluación (Cuentas de Prueba)

Para probar la plataforma con los diferentes roles requeridos por la cátedra:

| Rol | Correo Electrónico | Contraseña | Permisos y Acceso |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@admin.com` | `admin123` | Acceso completo al panel `/admin` y `/admin/productos` (CRUD de catálogo con alta, edición y eliminación de productos). |
| **Cliente** | `cliente@ejemplo.com` | `123456` | Navegación de catálogo, carrito, favoritos, personalización de perfil y compras. |

> 💡 _También podés crear tu propia cuenta desde `/registro` (soporta carga de avatar a la nube) o iniciar sesión directamente con Google._

---

## 📋 Cumplimiento de Requerimientos de la Entrega

### ✅ 1. Entrega Mínima
- [x] **Todo lo visto hasta Pre-Entrega:** Listado de productos, detalle de producto y carrito global con contexto (`CartContext`).
- [x] **Vista de productos en carrito:** Vista completa en `/carrito` con desglose, controles de cantidad, cálculo de envío y drawer lateral interactivo (`CartDrawer`).
- [x] **Componente de alta de productos funcionando:** Modal interactivo para agregar nuevos productos con validación de campos y subida automática de imagen a ImgBB.
- [x] **Conexión en tiempo real con Firebase:** `ItemListContainer` e `ItemDetailContainer` consumen directamente la base de datos de Cloud Firestore. Al crear un producto desde el panel de admin, este se refleja inmediatamente en el catálogo.
- [x] **Configuración para producción:** Archivo `vercel.json` implementado en la raíz con reglas de reescritura (*rewrites*) para garantizar que rutas directas como `/admin` o `/carrito` funcionen sin error 404.

### ✅ 2. Entrega Completa
- [x] **Separación de layouts:** Arquitectura limpia con [`PublicLayout.jsx`](./src/layouts/PublicLayout.jsx) para la tienda pública y [`AdminLayout.jsx`](./src/layouts/AdminLayout.jsx) para el panel de administración.
- [x] **Login para administrador:** Formulario de inicio de sesión conectado a Firebase Authentication.
- [x] **Usuario administrador predeterminado:** Usuario `admin@admin.com` / `admin123` creado y operativo en Firebase.
- [x] **AuthContext:** Contexto centralizado para la sesión, persistencia con `onAuthStateChanged`, login con email/password, registro y autenticación vía Google.
- [x] **ProtectedRoute:** Protección de rutas mediante el componente `ProtectedRoute`, validando roles (`admin`) para restringir el acceso al dashboard y formulario de productos.

### ⭐ 3. Extras Opcionales (CRUD Completo)
- [x] **Editar productos:** Edición en vivo de título, precio, categoría, descripción y stock mediante modal pre-cargado.
- [x] **Eliminar productos:** Eliminación de documentos en Firestore con confirmación contextual estilizada.
- [x] **Dashboard administrativo:** Resumen de métricas comerciales, estado de inventario y alertas de stock bajo.

---

## 📌 Novedades y Funcionalidades del Sistema

### 1. 🔐 Autenticación y Contexto (`AuthContext.jsx`)
- Integración oficial con **Firebase Authentication** y **Cloud Firestore**.
- Sincronización del estado de autenticación en tiempo real con `onAuthStateChanged`.
- Almacenamiento y recuperación del perfil de usuario y rol (`admin` o `cliente`) desde la colección `users` en Firestore.
- Soporte para inicio de sesión clásico y con proveedor **Google Sign-In**.

### 2. 🛡️ Rutas Protegidas y Separación de Layouts
- **`PublicLayout`**: Contiene la navegación principal (`Header`, `Navbar`, `CartDrawer`), contenedor `<main>` con `<Outlet />` y `Footer`.
- **`AdminLayout`**: Layout exclusivo para administradores con barra lateral de navegación (*sidebar*), cabecera de métricas y área de trabajo.
- **`ProtectedRoute`**: Componente de orden superior que comprueba el estado de carga (`loading`), si hay sesión activa y si el rol del usuario cuenta con los permisos necesarios (`allowedRoles={["admin"]}`).

### 3. 📦 Catálogo Conectado a Cloud Firestore
- **`ItemListContainer`**: Consulta dinámica a la colección `productos` en Firestore, con soporte para filtrado reactivo por categoría (`/categoria/:categoria`) mediante cláusulas `where()`.
- **`ItemDetailContainer`**: Carga de producto individual por ID mediante `getDoc()`.
- **Paginación avanzada:** Paginación accesible con `react-paginate` que conserva la posición en la navegación.

### 4. ⚙️ Panel de Administración (`/admin` y `/admin/productos`)
- **Gestión de Inventario:** Tabla con listado completo, filtros rápidos por categoría, búsqueda por nombre y etiquetas visuales de stock.
- **Modal de Alta y Edición (`FormularioProductoModal.jsx`):** Formulario unificado para dar de alta nuevos productos o editar existentes, con validación de entradas y subida de imágenes a ImgBB.
- **Eliminación:** Borrado seguro de documentos en Firebase Firestore (`deleteDoc`).

### 5. 🛒 Carrito de Compras (`CartContext.jsx`)
- Estado global sincronizado que gestiona artículos, cantidades y cálculos de subtotales.
- **CartDrawer:** Panel lateral desplegable que permite revisar la compra y visualizar la barra de progreso hacia el beneficio de **Envío Gratis** ($50.000).
- **Página de Carrito (`/carrito`):** Vista completa y modularizada (`CartContent`, `CartEmpty`, `CartItem`, `CartSummary`).

### 6. ☁️ Subida de Imágenes a ImgBB (`imgbbService.js`)
- Subida asíncrona de archivos multimedia a la nube de **ImgBB** mediante `FormData` con clave de API configurada en entorno.
- Validación de formatos (JPG, PNG, WebP) y límite de tamaño (máx. 5 MB) antes del envío.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
| :--- | :--- |
| **[React 18](https://react.dev/)** | Biblioteca principal para interfaces de usuario reactivas |
| **[Vite 5](https://vitejs.dev/)** | Bundler y servidor de desarrollo ultrarrápido |
| **[Firebase 10](https://firebase.google.com/)** | Backend Serverless: Cloud Firestore (Base de datos) y Firebase Auth (Autenticación) |
| **[React Router DOM v7](https://reactrouter.com/)** | Enrutamiento SPA, layouts anidados y rutas protegidas |
| **[React Hot Toast](https://react-hot-toast.com/)** | Sistema de notificaciones emergentes |
| **[React Paginate](https://github.com/AdeleD/react-paginate)** | Paginación interactiva del catálogo de productos |
| **[React Icons](https://react-icons.github.io/react-icons/)** | Iconografía vectorial moderna (Feather Icons) |
| **[ImgBB API](https://api.imgbb.com/)** | Alojamiento en la nube para imágenes de productos y perfiles |
| **[CSS Modules](https://github.com/css-modules/css-modules)** | Modularización y encapsulamiento de estilos |

---

## 🗺️ Mapa de Rutas de la Aplicación

### Rutas Públicas (Bajo `PublicLayout`)
| Ruta | Descripción |
| :--- | :--- |
| `/` | Portada con Banner, barra de beneficios, categorías destacadas y catálogo |
| `/productos` | Catálogo completo con paginación interactiva |
| `/categoria/:categoria` | Catálogo filtrado por categoría (`tecnologia`, `indumentaria`, `accesorios`) |
| `/producto/:id` | Detalle del producto con selector de cantidad, cuotas y sellos de confianza |
| `/carrito` | Página de resumen de carrito y cálculo de envío |
| `/favoritos` | Listado de artículos guardados por el usuario |
| `/login` | Formulario de acceso con correo y Google |
| `/registro` | Formulario de registro con subida opcional de avatar |
| `/perfil` | Panel privado de usuario (requiere inicio de sesión) |
| `*` | Página 404 personalizada para URLs inexistentes |

### Rutas de Administración (Bajo `AdminLayout` y `ProtectedRoute`)
| Ruta | Descripción |
| :--- | :--- |
| `/admin` | Dashboard principal con métricas comerciales y accesos directos |
| `/admin/productos` | Gestión de catálogo: tabla, filtros, alta/edición de productos y eliminación |
| `/admin/pedidos` | Resumen de pedidos del sistema |
| `/admin/clientes` | Directorio de clientes |

---

## 📂 Estructura del Proyecto

```text
ecommerce/
├── public/
│   ├── productos.json             # Respaldo inicial de datos
│   └── usuarios.json              # Mock de usuarios
├── src/
│   ├── components/
│   │   ├── Auth/                  # Formularios de Login y Registro
│   │   ├── common/                # Componentes reutilizables (Pagination, ProtectedRoute, ScrollToTop)
│   │   ├── home/                  # Banner, BeneficiosBar, CategoriasDestacadas
│   │   ├── layout/                # Header, Navbar, Footer, UserDropdown, CartDrawer, CartWidget
│   │   └── product/               # Item, ItemDetail, ItemList
│   ├── context/
│   │   ├── AuthContext.jsx        # Estado global de autenticación con Firebase Auth
│   │   └── CartContext.jsx        # Estado global del carrito de compras
│   ├── firebase/
│   │   └── config.js              # Inicialización de Firebase (Firestore & Auth)
│   ├── layouts/
│   │   ├── PublicLayout.jsx       # Layout público de la tienda
│   │   └── AdminLayout.jsx        # Layout administrativo con sidebar
│   ├── pages/
│   │   ├── Admin/                 # Dashboard, AdminProductosPage y modal de creación/edición
│   │   ├── Cart/                  # Página principal de carrito
│   │   ├── Favoritos/             # Vista de favoritos
│   │   ├── Home/                  # Portada
│   │   ├── ItemDetailContainer/   # Detalle de producto conectado a Firestore
│   │   ├── ItemListContainer/     # Catálogo con filtrado conectado a Firestore
│   │   ├── Login/                 # Página de inicio de sesión
│   │   ├── NotFound/              # Página 404
│   │   ├── Profile/               # Perfil de usuario con pestañas
│   │   └── Register/              # Registro de usuario
│   ├── services/
│   │   └── imgbbService.js        # Servicio de subida de imágenes a ImgBB
│   ├── utils/
│   │   └── validateForm.js        # Validadores de formularios
│   ├── App.jsx                    # Configuración de rutas y layout wrappers
│   ├── index.css                  # Variables globales y estilos base
│   └── main.jsx                   # Punto de entrada de la aplicación
├── .env.example                   # Plantilla de variables de entorno
├── index.html                     # HTML raíz con metadatos
├── package.json                   # Dependencias y scripts
├── vercel.json                    # Configuración de rewrites para despliegue en Vercel
└── vite.config.js                 # Configuración de Vite
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
```env
VITE_IMGBB_API_KEY=tu_api_key_aqui
```

### 4. Iniciar el servidor de desarrollo
```bash
pnpm dev
# o con npm:
npm run dev
```

### 5. Compilar para producción
```bash
pnpm build
# o con npm:
npm run build
```

---

## 👨‍💻 Autor

- **Leandro Victorino Cruz**
- Curso: **Desarrollo Frontend con React** — _Talento Tech_
- Año: 2026
