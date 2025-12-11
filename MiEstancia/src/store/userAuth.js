import { create } from 'zustand'


const useUserAuth = create((set)=>({
    userSession: null,
    uid: null,
    setUserSession: (userSession)=> set({userSession, uid: userSession?.id}),
}))

export default useUserAuth;