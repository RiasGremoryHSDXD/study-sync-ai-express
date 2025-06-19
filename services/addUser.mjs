import { supabase } from "./supabaseClient.mjs";

export async function addUSer(email, password) {
    
    const {data, error} = await supabase.auth.signUp({
        email,
        password
    })

    if (error) throw new Error(error.message)

    return data
    
}