import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import PublicPage from './pages/PublicPage.jsx'
import Login from './pages/Login.jsx'
import AdminPanel from './pages/AdminPanel'
import useUserAuth from './store/userAuth.js'
import { supabase } from './utils/supabaseClient.js'
import { initAuthSession } from './ase-utils/auth.js'

function App() {
  const { userSession, setUserSession } = useUserAuth();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

     useEffect(()=>{
     initAuthSession({setUserSession, setIsCheckingSession})

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session)=>{
            setUserSession(session?.user ?? null);
        });
        return ()=>{
            listener?.subscription?.unsubscribe();
        };
    }, []);

  return (
    <Routes>
      <Route path='/' element={<PublicPage />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/admin/*'
       element={
        isCheckingSession
          ? <div>Cargando Sesión...</div>
          : userSession
            ? <AdminPanel />
            : <Navigate to={"/login"}/>
       }
       />
    </Routes>
  )
}

export default App;
