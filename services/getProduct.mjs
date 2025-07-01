import { supabase } from "./supabaseClient.mjs";

export async function productDetails() {
    
    const { data, error } = await supabase.rpc('getproduct')

    if(error) {
        console.log('RPC getProduct_failed', error.message)
        throw error
    }

    return data
}