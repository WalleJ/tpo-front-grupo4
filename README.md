# TPO Front - AI-O HOME (Grupo 4)

Aplicación frontend del ecommerce **AI-O HOME**, desarrollada con **React + Vite + JavaScript**. El proyecto funciona como un prototipo navegable de marketplace para productos smart home, con flujos diferenciados para usuario y administrador.

- **USER**: navegación por home, catálogo, detalle de producto, carrito, checkout y perfil.
- **ADMIN**: dashboard de administración y gestión visual de entidades.

La autenticación, los productos, el carrito, el perfil y los listados administrativos usan datos mock y persistencia local mediante `localStorage`.

## 1. Estructura del proyecto

- `src/main.jsx`
  - Punto de entrada de la aplicación React.
  - Configura `BrowserRouter`, providers globales y router principal.
- `src/app/router/`
  - Rutas públicas, rutas protegidas y redirecciones.
- `src/app/layouts/`
  - Layouts para auth, marketplace y administración.
- `src/app/providers/`
  - Composición de providers globales.
- `src/pages/auth/`
  - `LoginPage.jsx`
  - `RegisterPage.jsx`
  - `RecoverPage.jsx`
- `src/pages/marketplace/`
  - `HomePage.jsx`
  - `StorePage.jsx`
  - `ProductPage.jsx`
  - `CartPage.jsx`
  - `ProfilePage.jsx`
- `src/pages/admin/`
  - `DashboardPage.jsx`
  - `ListingsPage.jsx`
- `src/components/`
  - Componentes reutilizables de auth, marketplace, producto, admin y UI base.
- `src/context/`
  - Contextos de autenticación y tema.
- `src/hooks/`
  - Hooks personalizados para auth, tema, modales, checkout y perfil.
- `src/services/`
  - Servicios mock para auth, productos, marketplace, administración y storage.
- `src/data/mock/`
  - Datos iniciales de productos, carrito y perfil.
- `src/types/`
  - Documentación JSDoc de las estructuras del dominio.
- `src/styles/`
  - Estilos globales.
- `public/`
  - Assets públicos.
- `pages/`
  - Prototipo HTML estático legado. La app actual se ejecuta desde `src`.

## 2. Cómo inicializar y ejecutar el proyecto

### Requisitos

- Node.js instalado.
- npm instalado.

Se recomienda usar una versión actual de Node compatible con Vite 5.

### Instalación

Desde la raíz del proyecto:

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

Vite mostrará una URL local similar a:

```text
http://localhost:5173/
```

Al abrir la aplicación, cualquier ruta desconocida redirige a:

```text
/auth/login
```

### Compilar para producción

```bash
npm run build
```

El build se genera en la carpeta `dist/`.

### Previsualizar build de producción

```bash
npm run preview
```

## 3. Credenciales de prueba

El login está simulado con credenciales mock:

| Rol | Usuario | Contraseña | Redirección |
| --- | --- | --- | --- |
| ADMIN | `admin` | `admin` | `/admin/dashboard` |
| USER | `user` | `user` | `/marketplace/home` |

Si las credenciales no coinciden, se muestra un mensaje de error en la pantalla de login.

## 4. Flujo de navegación

### 4.1 Flujo de autenticación

1. El usuario ingresa en `/auth/login`.
2. Desde login puede navegar a:
   - Registro: `/auth/register`
   - Recupero de contraseña: `/auth/recover`
3. Si inicia sesión como `admin`, entra al dashboard administrativo.
4. Si inicia sesión como `user`, entra al marketplace.
5. El logout limpia la sesión local y vuelve a login.

### 4.2 Flujo de usuario

1. Desde `/marketplace/home` puede ver secciones destacadas y productos.
2. En `/marketplace/store` puede buscar, filtrar y agregar productos al carrito.
3. En `/marketplace/product/:productId` puede ver el detalle de un producto.
4. En `/marketplace/cart` puede modificar cantidades, pasar al checkout, agregar tarjeta y finalizar compra.
5. En `/marketplace/profile` puede ver perfil, historial de compras, métodos de pago y sesiones.

### 4.3 Flujo administrador

1. Desde `/admin/dashboard` ve métricas generales y accesos a módulos.
2. Desde `/admin/listings?tab=users` puede cambiar entre módulos:
   - Users
   - Products
   - Categories
   - Promos and discounts
   - Orders
3. La pantalla de listados permite crear, editar y eliminar registros en modo prototipo.
4. Las rutas admin están protegidas por rol.

## 5. Componentes y vistas definidas

### 5.1 Auth

- **Login**: formulario de usuario/contraseña, validación mock y navegación por rol.
- **Register**: formulario de alta simulado y retorno a login.
- **Recover**: formulario de email con mensaje de confirmación.

### 5.2 Marketplace

- **MarketplaceLayout**: header fijo con navegación principal y cambio de tema.
- **Home**: hero, métricas, productos destacados, novedades, newsletter y footer.
- **Store**: catálogo con búsqueda, filtros y cards de producto.
- **Product detail**: vista técnica del producto y acción de agregar al carrito.
- **Cart**: listado de items, resumen de compra, checkout, alta de tarjeta y confirmación de compra.
- **Profile**: encabezado de perfil, nivel comprador, sesiones, métodos de pago, reclamos e historial.

### 5.3 Admin

- **AdminLayout**: header administrativo, cambio de tema, navegación a dashboard y logout.
- **Dashboard**: cards de métricas por módulo y actividad reciente.
- **Listings**: tabs por entidad, búsqueda/filtros, formularios y modales para acciones CRUD visuales.

## 6. Estado y persistencia

El estado se maneja principalmente con hooks de React, contextos y servicios mock.

- `AuthContext`: usuario actual y acciones de autenticación.
- `ThemeContext`: tema claro/oscuro.
- `useCheckoutFlow`: estado del carrito, checkout, métodos de pago y compra.
- `useProfileDashboard`: estado de perfil, historial y métodos de pago.
- `useModal`: apertura/cierre de modales con payload opcional.

Claves principales en `localStorage`:

- `aio-auth-user`
- `role`
- `aio-theme`
- `aio-marketplace-cart`
- `aio-marketplace-profile`
- `aio-admin-records`

## 7. Estilo general de interfaz

- Diseño responsive con Tailwind CSS.
- Estética glassmorphism suave.
- Fondos con mesh/radial gradients.
- Soporte de modo claro/oscuro.
- Tipografía principal: `Sora`.
- Iconografía: `Material Symbols Outlined`.
- Componentes visuales reutilizables para botones, inputs, cards, tabs, modales, header, badges y loaders.

## 8. Estado actual y alcance

- El front funciona como prototipo navegable de alta fidelidad.
- La autenticación está simulada.
- Los datos se obtienen desde mocks locales.
- El carrito, perfil, tema, sesión y registros admin se persisten en `localStorage`.
- El CRUD administrativo es visual y local.
- El checkout genera una orden mock y la agrega al historial del perfil.

## 9. Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm install` | Instala dependencias del proyecto. |
| `npm run dev` | Inicia Vite en modo desarrollo. |
| `npm run build` | Genera build de producción con Vite en `dist/`. |
| `npm run preview` | Sirve localmente el build generado. |

## 10. Documentación adicional

- `TECH_DOC.md`: describe conexiones entre páginas, componentes, hooks y servicios del proyecto React.
