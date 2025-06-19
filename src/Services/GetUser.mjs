import { supabase } from "../supabaseClient.mjs"

export async function getUser() {
  const { data, error } = await supabase.rpc('user_function')

  if (error) {
    console.error("RPC user_function_failed", error)
    throw error
  }

  return data
}

