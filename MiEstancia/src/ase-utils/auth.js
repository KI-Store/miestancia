// 📦 ase-utils/auth.js

import { supabase } from "../utils/supabaseClient.js";

export async function initAuthSession({ setUserSession, setIsCheckingSession = null }) {
  try {
    const { data } = await supabase.auth.getSession();
    if (data?.session?.user) {
      setUserSession(data.session.user);
    } else {
      setUserSession(null);
    }

    if (setIsCheckingSession) {
      setIsCheckingSession(false);
    }
  } catch (error) {
    console.error("Error al recuperar sesión:", error);
    if (setIsCheckingSession) {
      setIsCheckingSession(false);
    }
  }
}