# Archivos de Sonido

Esta carpeta contiene los efectos de sonido y música de fondo para la aplicación.

## Archivos Requeridos

Por favor, coloca los siguientes archivos de audio en formato MP3 en esta carpeta:

1. **correct.mp3** - Sonido que se reproduce cuando el usuario presiona la tecla correcta
2. **incorrect.mp3** - Sonido que se reproduce cuando el usuario presiona una tecla incorrecta
3. **background-music.mp3** - Música de fondo que se reproduce en loop durante toda la aplicación

## Especificaciones Recomendadas

### Efectos de Sonido (correct.mp3, incorrect.mp3)
- Formato: MP3
- Duración: 0.5 - 2 segundos
- Volumen: Normalizado (el código lo ajusta automáticamente)
- Calidad: Moderada (128kbps es suficiente)

### Música de Fondo (background-music.mp3)
- Formato: MP3
- Duración: 2 - 5 minutos (se reproduce en loop)
- Volumen: Normalizado y suave (música ambiente)
- Calidad: Moderada (128kbps es suficiente)
- Estilo: Música infantil alegre y relajante

## Notas

Los sonidos se reproducirán automáticamente:
- **correct.mp3**: Se presiona la tecla correcta
- **incorrect.mp3**: Se presiona una tecla incorrecta
- **background-music.mp3**: Se reproduce en loop con un botón flotante para silenciar/activar

Si los archivos no están presentes, la aplicación funcionará normalmente pero sin efectos de sonido o música.
