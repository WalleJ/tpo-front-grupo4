# TPO Front - AI-O HOME (Grupo 4)

Frontend estático del ecommerce **AI-O HOME**, orientado a prototipar la experiencia de usuario para dos perfiles:

- **USER**: navegación de tienda, home, carrito y perfil.
- **ADMIN**: dashboard y listados de administración.

El proyecto está construido con páginas HTML, Tailwind CSS vía CDN, JavaScript vanilla y assets locales en `images/`.

## 1. Estructura del proyecto

- `src/pages/auth/`
  - `Login.html`
  - `Register.html`
  - `Recover.html`
- `src/pages/shop/`
  - `AI-O_HOME.html`
- `src/pages/admin/`
  - `AdminDashboard.html`
  - `AdminLists.html`
- `images/`
  - Recursos visuales (productos, banners)
- `sketch/`
  - Bocetos de diseño

## 2. Como ejecutarlo

Este frontend no requiere build ni dependencias locales.

### Opcion A (recomendada): Live Server en VS Code

1. Abrir la carpeta `tpo-front-grupo4` en VS Code.
2. Abrir `src/pages/auth/Login.html`.
3. Ejecutar **Open with Live Server**.

### Opcion B: abrir archivos directamente

1. Abrir `src/pages/auth/Login.html` en el navegador.
2. Navegar usando los links y botones de la interfaz.

El flujo de auth esta simulado por rol con `localStorage`, dentro del alcance del prototipo visual.

## 3. Flujo de navegacion

### 3.1 Flujo de autenticacion

1. **Ingreso** en `Login.html`.
2. Si las credenciales son validas en el mock local:
   - `admin/admin` -> redirecciona a `../admin/AdminDashboard.html`
   - `user/user` -> redirecciona a `../shop/AI-O_HOME.html#home`
3. Si no son validas, se muestra mensaje de error en la misma vista.
4. Desde login tambien se puede ir a:
   - Recupero de clave (`Recover.html`)
   - Registro (`Register.html`)

### 3.2 Flujo de usuario (USER)

1. Desde login entra a `AI-O_HOME.html`.
2. Navega por secciones internas: **Home**, **Store**, **Cart**, **Profile**.
3. Puede explorar sliders, ver productos destacados y navegar a detalle.
4. En mobile existe barra de navegacion inferior; en desktop, top bar.

### 3.3 Flujo administrador (ADMIN)

1. Desde login entra a `AdminDashboard.html`.
2. Desde dashboard accede a `AdminLists.html` por modulo:
   - Users
   - Products
   - Categories
   - Promos and discounts
   - Orders
3. Ambas vistas admin validan rol con `localStorage`; si no es ADMIN, redirigen a login.
4. Logout limpia rol y vuelve a `Login.html`.

## 4. Componentes y vistas definidas

## 4.1 Auth

- **Login**: formulario de usuario/contrasena, validacion mock, links de recupero/registro.
- **Register**: formulario de alta de usuario (simulado) y retorno a login.
- **Recover**: formulario de email con mensaje de confirmacion.

## 4.2 Shop

- **Top App Bar** con logo, navegacion principal y toggle de tema.
- **Hero** con CTA principal.
- **Bloque de metricas** de catalogo.
- **Sliders de productos** (altavoces, displays, streaming) con autoplay y controles.
- **Card promocional** de producto destacado.
- **CTA newsletter**.
- **Footer** informativo.
- **Navegacion mobile** (bottom nav).

## 4.3 Admin

- **Admin Dashboard**:
  - Header con badge de rol y logout.
  - KPIs/cards de resumen por modulo.
  - Seccion de actividad reciente.
- **Admin Lists**:
  - Navegacion por tabs.
  - Listados por entidad (users/products/categories/promos/orders).
  - Acciones visuales de CRUD (botones de crear/editar/eliminar, en modo maqueta).

## 5. Paleta de colores

Paleta principal inspirada en cian/teal sobre base clara:

- **Primario**: `#006970`
- **Primario intenso/acento**: `#00dbe9`
- **Primario contenedor**: `#00f0ff`
- **Fondo base**: `#fcf8f9`
- **Texto principal**: `#1c1b1c`
- **Texto secundario**: `#3b494b`
- **Bordes/superficie variante**: `#b9cacb`, `#e5e2e3`
- **Error**: `#ba1a1a`

El shop incluye mapeo extendido de tokens (estilo Material-like) en la configuracion Tailwind inline.

## 6. Tipografia

- **Familia principal**: `Sora` (Google Fonts).
- **Iconografia**: `Material Symbols Outlined`.
- **Escalas de texto** definidas para display, headlines, body y label-caps (especialmente en `AI-O_HOME.html`).

## 7. Estilo general de interfaz

- Enfoque visual **glassmorphism suave**:
  - Paneles semitransparentes
  - `backdrop-filter: blur(...)`
  - bordes tenues
- Fondos con **mesh/radial gradients** cian-teal.
- Microinteracciones con hover y transiciones cortas.
- Layout responsive con Tailwind (`md`, `lg`, `xl`).
- Soporte de **modo oscuro** en la vista shop mediante clase `dark`.

## 8. Estado actual y alcance

- El front funciona como **prototipo navegable** de alta fidelidad.
- Parte de las acciones de negocio (CRUD, auth real, carrito persistente) estan mockeadas visualmente.
- El foco actual es la experiencia de interfaz, navegacion y consistencia visual entre vistas.
