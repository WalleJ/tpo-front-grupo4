# Documentación Técnica

## 1. Descripción general del proyecto

AI-O HOME es una aplicación React + Vite + TypeScript para un marketplace de productos smart home. Tiene dos áreas principales:

- **Marketplace**: home, catálogo, detalle de producto, carrito/checkout y perfil.
- **Administración**: dashboard y pantalla de gestión de entidades.

La app se monta desde `src/main.tsx`, donde se configuran `BrowserRouter`, `AppProviders` y `AppRouter`. La navegación se define con React Router. El estado global se concentra en contextos de React para autenticación y tema. Los datos del prototipo se manejan con servicios mock, datos locales y `localStorage`.

También existe una carpeta `pages` con HTML estático legado/prototipo. La aplicación React actual está en `src`.

## 2. Estructura de carpetas

| Carpeta | Responsabilidad |
| --- | --- |
| `src/app/layouts` | Layouts por área: auth, admin y marketplace. |
| `src/app/providers` | Composición de providers globales. |
| `src/app/router` | Definición de rutas y protección por autenticación/rol. |
| `src/components` | Componentes reutilizables por dominio y componentes base de UI. |
| `src/context` | Contextos globales de autenticación y tema. |
| `src/data/mock` | Datos iniciales mock de productos, carrito y perfil. |
| `src/hooks` | Hooks personalizados para lógica reutilizable. |
| `src/pages` | Páginas React principales. |
| `src/services` | Servicios de lógica mock y persistencia local. |
| `src/styles` | Estilos globales. |
| `src/types` | Tipos TypeScript del dominio. |
| `src/utils` | Helpers, formateadores y validadores simples. |
| `public` | Assets públicos. |
| `pages` | Prototipo HTML estático separado de la app React. |
| `dist` | Build generado. |

## 3. Mapa de páginas

| Página | Ruta | Función principal | Conexiones clave |
| --- | --- | --- | --- |
| `LoginPage.tsx` | `/auth/login` | Login de usuario/admin. | `AuthCard`, `LoginForm`, `useAuth.login`; navega por rol. |
| `RegisterPage.tsx` | `/auth/register` | Registro simulado. | `AuthCard`, `RegisterForm`, `useAuth.register`; vuelve a login. |
| `RecoverPage.tsx` | `/auth/recover` | Recupero simulado de contraseña. | `AuthCard`, `RecoverForm`, `useAuth.recover`; muestra confirmación. |
| `DashboardPage.tsx` | `/admin/dashboard` | Métricas y accesos admin. | `AdminStatCard`, `adminService.getStats`; escucha cambios de records. |
| `ListingsPage.tsx` | `/admin/listings?tab=...` | CRUD visual de entidades admin. | `Tabs`, `Button`, `useModal`, `adminService`; maneja records, filtros, formularios y modales. |
| `HomePage.tsx` | `/marketplace/home` | Home del marketplace. | `productService.list`; envía productos a secciones como `FeaturedProducts`. |
| `StorePage.tsx` | `/marketplace/store` | Catálogo con búsqueda/filtros. | `ProductCard`, `productService.list`, `marketplaceService`; agrega productos al carrito. |
| `ProductPage.tsx` | `/marketplace/product/:productId` | Detalle de producto. | `ProductDetail`, `productService.getById`, `marketplaceService`; agrega al carrito. |
| `CartPage.tsx` | `/marketplace/cart` | Carrito y checkout. | `useCheckoutFlow`, `CartItemCard`, `CartSidebar`, `CheckoutPanel`, `AddCardModal`. |
| `ProfilePage.tsx` | `/marketplace/profile` | Perfil, historial y métodos de pago. | `useAuth`, `useProfileDashboard`, cards y modales de perfil. |

## 4. Conexión entre componentes

| Relación | Comunicación | Propósito |
| --- | --- | --- |
| `main.tsx` → `AppProviders` → `AppRouter` | Providers envuelven las rutas. | Dar contexto global y navegación a toda la app. |
| `AppRouter` → `ProtectedRoute` | Recibe `role` opcional y `children`. | Validar sesión y rol antes de renderizar layouts privados. |
| `AdminLayout` → `Header` / `Outlet` | Pasa título, icono, acciones de tema/logout. | Encapsular navegación y acciones comunes admin. |
| `MarketplaceLayout` → `NavLink` / `Outlet` | Links principales y toggle de tema. | Encapsular navegación común del marketplace. |
| Páginas auth → forms | Los forms usan `useAuth` y `react-hook-form`. | Ejecutar login, registro o recupero y navegar según resultado. |
| `HomePage` → secciones marketplace | Pasa `products`. | Reutilizar datos de productos en hero, estadísticas y sliders. |
| `FeaturedProducts` → `ProductSlider` | Pasa productos agrupados y `onSelect`. | Navegar al detalle desde sliders. |
| `StorePage` → `ProductCard` | Pasa `product` y `onAddToCart`. | Renderizar catálogo y delegar evento de compra al padre. |
| `ProductPage` → `ProductDetail` | Pasa `product` y `onAddToCart`. | Mostrar detalle y delegar agregado al carrito. |
| `CartPage` → componentes de carrito | Pasa items, totales, métodos de pago y callbacks. | Concentrar la lógica en `useCheckoutFlow` y renderizar cada bloque. |
| `ProfilePage` → cards/modales de perfil | Pasa perfil, órdenes, métodos y callbacks. | Mostrar datos y pedir confirmación para acciones sensibles. |
| `DashboardPage` → `AdminStatCard` | Pasa label, valor y tab. | Entrar a listados filtrados por módulo. |
| `ListingsPage` → UI interna | Maneja estado y callbacks localmente. | Centralizar edición, borrado, filtros, relaciones e imágenes. |

## 5. Routing y navegación

| Aspecto | Detalle |
| --- | --- |
| Librería | `react-router-dom` v6. |
| Archivo principal | `src/app/router/AppRouter.tsx`. |
| Router base | `BrowserRouter` en `src/main.tsx`. |
| Rutas públicas | `/auth/login`, `/auth/register`, `/auth/recover`. |
| Rutas marketplace | `/marketplace/home`, `/marketplace/store`, `/marketplace/product/:productId`, `/marketplace/cart`, `/marketplace/profile`. |
| Rutas admin | `/admin/dashboard`, `/admin/listings`. |
| Redirecciones | Ruta desconocida a `/auth/login`; usuario sin sesión a login; usuario sin rol admin a `/marketplace/home`. |
| Parámetros | `productId` en detalle de producto; `tab` por query string en listados admin. |
| Navegación | `Link`, `NavLink`, `useNavigate` y `Navigate`. |

## 6. Estado de la aplicación

| Tipo de estado | Uso |
| --- | --- |
| `useState` | Formularios simples, productos, filtros, carrito, checkout, perfil, modales y records admin. |
| `useEffect` | Carga inicial, sincronización con storage, listeners de eventos y scroll top. |
| `useMemo` | Productos filtrados, totales de compra, agrupaciones y datos derivados del perfil. |
| `useContext` | Acceso a autenticación y tema mediante hooks propios. |
| `react-hook-form` | Formularios de auth y alta de tarjeta. |
| `localStorage` | Usuario, rol, tema, carrito, perfil y records admin. |

Estado global:

- `AuthContext`: usuario actual y acciones de auth.
- `ThemeContext`: tema actual y alternancia claro/oscuro.

Claves persistidas principales:

- `aio-auth-user`
- `role`
- `aio-theme`
- `aio-marketplace-cart`
- `aio-marketplace-profile`
- `aio-admin-records`

## 7. Servicios y métodos

| Servicio | Métodos principales | Usado por | Responsabilidad |
| --- | --- | --- | --- |
| `auth.service.ts` | `login`, `register`, `recover`, `logout`, `getCurrentUser` | `AuthContext`, páginas auth, layouts, perfil | Autenticación mock, persistencia de usuario/rol y cierre de sesión. |
| `admin.service.ts` | `getRecordsByTabSync`, `saveRecordsByTab`, `subscribeToRecordsChanges`, `getStats`, `listByTab` | `DashboardPage`, `ListingsPage` | Lectura, guardado y sincronización de records admin. |
| `marketplace.service.ts` | `getInitialCartItems`, `setCartItems`, `clearCart`, `getProfile`, `setProfile`, `appendOrder`, `appendProfilePaymentMethod`, `removeProfilePaymentMethod`, `onStateChange`, `createOrderFromCart` | `StorePage`, `ProductPage`, `useCheckoutFlow`, `useProfileDashboard` | Carrito, perfil, órdenes, métodos de pago y eventos de sincronización. |
| `product.service.ts` | `list`, `getById` | `HomePage`, `StorePage`, `ProductPage` | Consulta de productos mock. |
| `storage.service.ts` | `get`, `set`, `remove` | `auth.service.ts`, `admin.service.ts` | Wrapper de `localStorage` con fallback ante errores de parseo. |

## 8. Hooks personalizados

| Hook | Archivo | Uso principal |
| --- | --- | --- |
| `useAuth` | `src/hooks/useAuth.ts` | Acceder al contexto de autenticación desde rutas, formularios, layouts y perfil. |
| `useTheme` | `src/hooks/useTheme.ts` | Acceder al tema y alternarlo desde layouts. |
| `useLocalStorage` | `src/hooks/useLocalStorage.ts` | Helper genérico de storage. No se identificó uso activo. |
| `useModal` | `src/hooks/useModal.ts` | Abrir/cerrar modales y guardar payload opcional. |
| `useCheckoutFlow` | `src/hooks/useCheckoutFlow.ts` | Manejar items, totales, métodos de pago, compra y éxito del checkout. |
| `useProfileDashboard` | `src/hooks/useProfileDashboard.ts` | Manejar perfil, orden seleccionada, métodos de pago y totales de historial. |

## 9. Validaciones y manejo de errores

| Área | Validaciones / errores |
| --- | --- |
| Auth login | Campos requeridos y error visible si las credenciales mock no coinciden. |
| Register | Campos principales requeridos; la acción es simulada. |
| Recover | Email requerido y mensaje de confirmación. |
| Store | Filtros locales por texto, categoría, asistente, conectividad y precio máximo. |
| Product detail | Si no encuentra producto, muestra `Product not found.` |
| Cart | No permite avanzar a checkout sin items; cantidad en cero elimina el item. |
| Checkout | Requiere método de pago seleccionado; el modal de tarjeta valida número, vencimiento y CVV. |
| Profile | Usa modales de confirmación para editar perfil y borrar métodos de pago. |
| Admin listings | Valida relaciones, reglas de promos, precio/stock y errores de campos del formulario. |
| Storage | Los servicios devuelven fallback ante JSON inválido. |

## 10. Dependencias relevantes

| Dependencia | Uso |
| --- | --- |
| `react` | Componentes, hooks y estado. |
| `react-dom` | Montaje de la app. |
| `react-router-dom` | Routing, links y navegación programática. |
| `react-hook-form` | Formularios y validaciones. |
| `vite` | Dev server y build. |
| `typescript` | Tipado estático. |
| `tailwindcss`, `postcss`, `autoprefixer` | Estilos utilitarios y procesamiento CSS. |
| `@vitejs/plugin-react` | Integración React con Vite. |

## 11. Observaciones técnicas

- `src/pages/admin/ListingsPage.tsx` concentra mucha lógica: campos, datos iniciales, validaciones, formularios, modales, imágenes y order items. Conviene separarlo por responsabilidad si el módulo crece.
- Existen componentes admin reutilizables (`AdminRecordCard`, `AdminSearchBar`, `AdminFilters`, `AdminTable`, `AdminCrudModal`) que no se identificaron como usados por `ListingsPage`.
- `authService.register` y `authService.recover` son simulados y no persisten usuarios nuevos.
- `StorePage` y `ProductPage` duplican la lógica de agregar productos al carrito. Conviene extraerla si se agregan más puntos de compra.
- `CheckoutPanel` mantiene datos de facturación locales, pero la orden creada no incluye esos datos.
- Hay algunos textos renderizados con problemas de codificación en componentes existentes. Conviene revisarlos antes de una entrega final.
- La carpeta `pages` HTML y el README describen una versión estática anterior. Para evitar confusión, conviene aclarar que `src` es la app React vigente.
