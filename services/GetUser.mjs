import { supabase } from "./supabaseClient.mjs";

export async function getUser() {

    const { data, error } = await supabase.rpc('get_employee')

    if(error){
        console.log("RPC get_employee_failed", error)
        throw error
    }

    return data
}