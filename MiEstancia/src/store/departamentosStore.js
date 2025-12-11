import { create } from 'zustand';

const useDepartamentosStore = create((set, get) => ({
  departamentosStore: [],

  addDepartamentos: (nuevos) => {
    console.log("datos recibidos: ", nuevos);
    const actuales = get().departamentosStore;

    // Crear un mapa para acceso rápido por ID
    const mapaActuales = new Map(actuales.map(dep => [dep.id, dep]));

    // Fusionar: si ya existe, actualiza; si no, agrega
    nuevos.forEach(dep => {
      mapaActuales.set(dep.id, dep);
    });

    // Convertir el mapa de nuevo a array
    const fusionados = Array.from(mapaActuales.values());

    set({ departamentosStore: fusionados });
  }
}));

export default useDepartamentosStore;