import { supabase } from "./supabaseClient.mjs";

export async function logInUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    
    if(error) throw new Error(error.message)
    return data
}