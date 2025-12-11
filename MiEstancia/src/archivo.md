# 🛠️ Ficha técnica: Reinstalación y configuración de Visual Studio Code

## 🗓️ Fecha del evento
`2025-08-18`

## 🔍 Problema detectado
Visual Studio Code dejó de funcionar en laptop y PC. El comando `code` no respondía y la carpeta de instalación estaba vacía.

### 🔎 Diagnóstico
- `where code` → no encontró el ejecutable
- Carpeta `Microsoft VS Code` vacía
- Extensiones y configuración no accesibles

## 🧨 Posibles causas
| Causa | Descripción |
|-------|-------------|
| Actualización de Windows | Eliminación de rutas no estándar o registros |
| Instalación corrupta | Carpeta vacía sin ejecutable |
| Limpieza automática | Antivirus o software de mantenimiento eliminó archivos |
| Registro dañado | El sistema perdió referencia al ejecutable |

## ✅ Solución aplicada
1. Reinstalación desde [code.visualstudio.com](https://code.visualstudio.com/)
2. Activación de opciones durante instalación:
   - Add to PATH
   - Open with Code (menú contextual)
   - Registrar como editor por defecto
3. Validación post-instalación:
   ```bash
   where code
   code --version




# ✨ Ficha técnica: Activación de ligaduras tipográficas en VS Code

## 🗓️ Fecha
`2025-08-19`

## 🎯 Objetivo
Activar ligaduras visuales con la fuente Fira Code en el editor de VS Code para mejorar la legibilidad y estética del código.

## 🔍 Síntomas iniciales
- Fuente Fira Code instalada
- Ligaduras no visibles en el editor
- Terminal sí mostraba ligaduras (`terminal.integrated.fontLigatures.enabled: true`)

## ✅ Solución aplicada

### 🔧 Configuración en `settings.json`
con ctrl + Shift + p    Preferencias: Abrir Configuración Json

```json
"editor.fontFamily": "\"Fira Code\", Consolas, 'Courier New', monospace",
"editor.fontLigatures": true,
"terminal.integrated.fontLigatures.enabled": true
   