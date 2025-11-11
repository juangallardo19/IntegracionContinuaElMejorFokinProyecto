# 🎓 Mentes Creativas - Aplicación Educativa Multimedia

## 📋 Descripción del Proyecto

Aplicación web educativa desarrollada en **React + Vite** para el **Colegio Mentes Creativas**, diseñada para apoyar los procesos de enseñanza-aprendizaje de estudiantes de **4° y 5° grado** (8-11 años) mediante recursos multimedia interactivos.

Este proyecto implementa calidad de software basada en **ISO/IEC 25010**, con pruebas automatizadas, integración continua y despliegue en la nube.

---

## 👥 Integrantes del Equipo

| Nombre | Correo | Área Responsable |
|--------|--------|------------------|
| Miguel Mendoza | miguel.mendozaj@campusucc.edu.co | 🎨 Artes |
| Sebastián López | jlopezbenavides73@gmail.com | 💻 Tecnología/Informática |
| Juan Gallardo | juangallardocsfn@gmail.com | 🧩 Pensamiento Lógico |

**Asignatura:** Calidad de Software
**Docente:** Mg. Gustavo Sánchez Rodríguez
**Universidad Cooperativa de Colombia**

---

## 🎯 Áreas Temáticas Implementadas

### 💻 **1. TECNOLOGÍA/INFORMÁTICA** - El Teclado Mágico
**Objetivo:** Enseñar a los estudiantes la ubicación de las teclas y mecanografía básica de forma lúdica.

**Funcionalidades:**
- Teclado visual interactivo en 2D
- Ejercicios progresivos de digitación
- Retroalimentación visual y sonora
- Sistema de puntuación y progreso

**Recursos Multimedia:**
- 🎵 Efectos de sonido al presionar teclas correctas
- ✨ Animaciones de teclas iluminadas
- 🎨 Visualización colorida del teclado

---

### 🎨 **2. ARTES** - Teoría del Color
**Objetivo:** Enseñar conceptos básicos de teoría del color mediante experimentación interactiva.

**Funcionalidades:**
- Mezclador de colores interactivo
- Identificación de colores primarios y secundarios
- Exploración de colores complementarios
- Paleta de colores dinámica

**Recursos Multimedia:**
- 🌈 Visualizaciones animadas de mezclas
- 🎵 Audio educativo explicando conceptos
- ✨ Transiciones suaves y efectos visuales

---

### 🧩 **3. PENSAMIENTO LÓGICO** - Secuencias y Patrones
**Objetivo:** Desarrollar habilidades de reconocimiento de patrones y razonamiento lógico.

**Funcionalidades:**
- Juegos de completar secuencias numéricas
- Patrones geométricos interactivos
- Niveles de dificultad progresivos
- Sistema de pistas y ayudas

**Recursos Multimedia:**
- 🔊 Efectos de sonido de retroalimentación
- 🎨 Gráficos animados de patrones
- ⭐ Visualización de logros y progreso

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Librería de componentes
- **Vite 7** - Build tool y dev server
- **TypeScript 5.8** - Tipado estático
- **TailwindCSS 4** - Estilos y diseño responsivo
- **Framer Motion** - Animaciones
- **React Router DOM** - Navegación

### Calidad y Testing
- **Jest 30** - Framework de pruebas
- **React Testing Library 16** - Testing de componentes
- **ESLint 9** - Linter
- **Prettier 3** - Formateo de código

### CI/CD y Despliegue
- **GitHub Actions** - Integración continua
- **Vercel** - Despliegue en producción

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js >= 18.18
- npm o yarn

### Clonar el repositorio
```bash
git clone https://github.com/guswill24/integracion_continua.git
cd IntegracionContinuaElMejorFokinProyecto
```

### Instalar dependencias
```bash
npm install
```

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm test` | Ejecuta todas las pruebas unitarias |
| `npm run type-check` | Verifica tipos de TypeScript |
| `npm run lint` | Ejecuta el linter |

---

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Layout.tsx       # Layout principal
│   ├── Navbar.tsx       # Barra de navegación
│   ├── Sidebar.tsx      # Menú lateral
│   │
│   ├── KeyboardGame.tsx           # 💻 Teclado Mágico (Tecnología)
│   ├── KeyboardGame.test.tsx      # Tests de Teclado
│   │
│   ├── ColorMixer.tsx             # 🎨 Teoría del Color (Artes)
│   ├── ColorMixer.test.tsx        # Tests de Color
│   │
│   ├── PatternSequence.tsx        # 🧩 Secuencias (Pensamiento Lógico)
│   ├── PatternSequence.test.tsx   # Tests de Secuencias
│   │
│   └── ... (componentes anteriores)
│
├── views/               # Vistas de cada sección
│   ├── HomePage.tsx
│   ├── KeyboardView.tsx
│   ├── ColorTheoryView.tsx
│   └── PatternGameView.tsx
│
├── routes/
│   └── AppRoutes.tsx    # Configuración de rutas
│
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

---

## 🎨 Paleta de Colores UCC

El proyecto utiliza la paleta oficial de la Universidad Cooperativa de Colombia:

```css
--ucc-blue: #00a5b5;      /* Azul institucional */
--ucc-green: #84bd00;     /* Verde institucional */
--gray-100 a --gray-900   /* Escala de grises */
--red-500: #ef4444;       /* Alertas */
--green-500: #22c55e;     /* Éxito */
--blue-500: #3b82f6;      /* Información */
```

---

## ✅ Componentes con Pruebas Unitarias

### Componentes Existentes (Ejercicios Jest)
1. ✅ **Tablas de Multiplicar** - Generador interactivo
2. ✅ **Conversor de Unidades** - Celsius ↔ Fahrenheit
3. ✅ **Validador de Contraseñas** - Validación en tiempo real
4. ✅ **Contador de Clics** - Con persistencia localStorage
5. ✅ **Lista de Tareas** - CRUD de tareas

### Nuevos Componentes Educativos
6. ✅ **Teclado Mágico** - Mecanografía para niños
7. ✅ **Teoría del Color** - Mezclador de colores
8. ✅ **Secuencias y Patrones** - Juegos de lógica

---

## 🧪 Pruebas de Calidad

### Tipos de Pruebas Implementadas

| Tipo | Herramienta | Estado |
|------|-------------|--------|
| **Unitarias** | Jest + RTL | ✅ Implementadas |
| **Integración** | Postman | 🔄 En proceso |
| **Sistema** | JMeter | 🔄 En proceso |
| **Implantación** | Vercel | 🔄 En proceso |
| **Aceptación** | Checklist | 🔄 En proceso |

### Ejecutar pruebas
```bash
# Todas las pruebas
npm test

# Pruebas en modo watch
npm test -- --watch

# Cobertura de código
npm test -- --coverage
```

---

## 🔄 Integración Continua (CI/CD)

El proyecto utiliza **GitHub Actions** para automatizar:
- ✅ Instalación de dependencias (`npm install`)
- ✅ Ejecución de pruebas unitarias (`npm test`)
- ✅ Compilación del proyecto (`npm run build`)
- ✅ Verificación de tipos TypeScript
- ✅ Linting y formato de código

---

## 🌐 Despliegue

### Producción
- **Plataforma:** Vercel
- **URL:** [Pendiente de configuración]
- **Auto-deploy:** Activado en rama principal

---

## 📊 Modelo de Calidad ISO/IEC 25010

Se aplicaron **2 subatributos** de calidad del modelo ISO/IEC 25010:

### Característica: [Por definir]
- **Subatributo 1:** [Por definir]
- **Subatributo 2:** [Por definir]

---

## 📖 Requerimientos Funcionales

### RF-01: Teclado Mágico
**Descripción:** El sistema debe permitir a los estudiantes practicar mecanografía mediante ejercicios interactivos.
- El sistema debe mostrar un teclado visual en 2D
- El sistema debe resaltar la tecla que el estudiante debe presionar
- El sistema debe reproducir sonidos al presionar teclas correctas
- El sistema debe mostrar el progreso del ejercicio

### RF-02: Teoría del Color
**Descripción:** El sistema debe permitir a los estudiantes experimentar con mezclas de colores.
- El sistema debe permitir seleccionar colores primarios
- El sistema debe mostrar el resultado de mezclar colores
- El sistema debe incluir audio educativo sobre colores
- El sistema debe mostrar la paleta de colores resultante

### RF-03: Secuencias y Patrones
**Descripción:** El sistema debe presentar ejercicios de reconocimiento de patrones.
- El sistema debe generar secuencias numéricas y geométricas
- El sistema debe validar las respuestas del estudiante
- El sistema debe proporcionar retroalimentación inmediata
- El sistema debe ajustar la dificultad según el progreso

---

## 🎓 Contexto Educativo

### Colegio Mentes Creativas
**Público objetivo:** Estudiantes de 4° y 5° grado (8-11 años)

**Áreas del currículo cubiertas:**
- 💻 Tecnología e Informática
- 🎨 Educación Artística
- 🧩 Pensamiento Lógico-Matemático

**Objetivo pedagógico:**
Incorporar recursos multimedia (audio, video, gráficos) que favorezcan el aprendizaje lúdico y significativo.

---

## 📝 Consideraciones de Desarrollo

- Cada componente debe tener **máximo 5 pruebas unitarias**
- Usar **paleta de colores UCC** en todos los componentes
- Incluir **recursos multimedia** (audio, animaciones)
- Diseño **responsivo** para tablets y computadoras
- Código **limpio y documentado**
- Commits **individuales por autor** según área

---

## 🤝 Contribuciones

Cada integrante es responsable de:
- Desarrollo de su componente asignado
- Creación de pruebas unitarias (máx. 5 por archivo)
- Documentación técnica
- Commits con su nombre y correo institucional

---

## 📚 Referencias

- [ISO/IEC 25010 - Modelo de Calidad](https://iso25000.com/index.php/normas-iso-25000/iso-25010)
- [React Documentation](https://react.dev)
- [Jest Testing Framework](https://jestjs.io)
- [React Testing Library](https://testing-library.com/react)
- [Vite Documentation](https://vitejs.dev)
- [Material Educativo UCC](https://asigcalidadsoftware.vercel.app)

---

## 📄 Licencia

Este proyecto es con fines educativos para la asignatura de Calidad de Software - Universidad Cooperativa de Colombia.

---

**Última actualización:** Noviembre 2025
