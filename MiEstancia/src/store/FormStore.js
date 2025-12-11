import { create } from "zustand";

export const useFormStore = create((set)=>({
    editingData: null,
    setEditingData: (data)=>{set({editingData: data}); return true},
    clearEditingData: ()=> set({editingData: null}),
    
}))