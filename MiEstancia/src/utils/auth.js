import { supabase } from "./supabaseClient.js";

export const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
        email: "asahelmendezhuerta06@gmail.com",
        password: "KAMH##MiEstancia$$2002@14$$03",
    });
    if(error){
        console.error("Error al registrar:", error.message);
        return {error: error.message};
    }else{
        console.log("Registro éxitoso :>>", data);
        return { user: data };
    }
};

export const handleLogin = async (email, password, setMessage, navigate) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if(error){
        console.error("Error al iniciar sesión: ", error.message);
        setMessage([error.message === "Invalid login credentials" ? "Credenciales incorrectas" : "Ocurrio un error al iniciar sesión", "red"]);
        return { error: error.message };
    }else{
        if (data.session) {
            
            navigate('/admin');
        }
        console.log("Inicio de sesión éxitoso");
        return { user: data }
    }
}

export const handleLogout = async (setUserSession, navigate)=>{
    try{
        await supabase.auth.signOut();
        setUserSession(null);
        navigate("/");
    }catch(err){
        console.log("Error al cerrar la sesión: ", err)
    }
}