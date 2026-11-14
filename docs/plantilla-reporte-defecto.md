# Plantilla de reporte de defecto

Copiar este formato para cada defecto. Un buen reporte permite que otra persona lo reproduzca sin preguntar nada.

| Campo | Contenido |
| --- | --- |
| **ID** | DEF-00 |
| **Título** | Qué falla y dónde, en una línea |
| **Severidad** | Crítica / Alta / Media / Baja (impacto en el usuario) |
| **Prioridad** | Alta / Media / Baja (urgencia de corregirlo) |
| **Entorno** | Sitio, navegador y versión, usuario o rol, fecha |
| **Precondiciones** | Estado necesario antes de empezar |
| **Pasos para reproducir** | 1. … 2. … 3. … |
| **Resultado esperado** | Lo que debería pasar |
| **Resultado obtenido** | Lo que pasa realmente |
| **Evidencia** | Captura, video o traza de Playwright |
| **Frecuencia** | Siempre / A veces / Una vez |
| **Prueba automatizada** | Archivo y nombre, si existe |

## Criterio de severidad

- **Crítica:** impide completar el flujo principal o pierde datos.
- **Alta:** el flujo principal funciona con una alternativa difícil, o hay datos incorrectos.
- **Media:** una función secundaria falla.
- **Baja:** problema visual o de texto sin impacto en el flujo.
