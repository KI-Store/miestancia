export function limpiarDepartamento(data = {}) {
  return {
    numero: data.numero ?? 0,
    tamaño: data.tamaño ?? "Chico",
    personas: data.personas ?? 2,
    baños: data.baños ?? 1,
    extras: typeof data.extras === "string"
      ? data.extras.split(",")
      : data.extras ?? [],
    precio: data.precio ?? 2000,
    disponible: data.disponible ?? true,
    huesped: data.huesped ?? "",
    telefono: data.telefono ?? "",
    entrada: data.entrada ?? "",
    imagenes: Array.isArray(data.imagenes) ? data.imagenes : []
  };
}

// Función para Convertir "extras" en array

// 🧩 Normalize extras from string or array
export function normalizeExtras(extras) {
  if (typeof extras === "string") {
    return extras
      .split(",")
      .map(e => e.trim())
      .filter(e => e.length > 0);
  }

  if (Array.isArray(extras)) {
    return extras.map(e => (typeof e === "string" ? e.trim() : "")).filter(Boolean);
  }

  return [];
}

// 📤 Convert extras array to flat string for editing inputs
export function extrasToString(extras) {
  if (Array.isArray(extras)) {
    return extras.filter(e => typeof e === "string").join(", ");
  }
  return typeof extras === "string" ? extras : "";
}
