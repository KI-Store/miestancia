import { create } from "zustand";

export const useStateSpiner = create(set=>({
    visible: true,
    setVisibleShow: (state)=> set({visible: true}),
    setVisibleHidden: ()=> set({visible:false}),
}));