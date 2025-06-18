const { supabase } = require('../supabaseClient.cjs')

async function getUser() {
  const { data, error } = await supabase.rpc('user_function')

  if (error) {
    console.error("RPC user_function_failed", error)
    throw error
  }

  return data
}

module.exports = { getUser }
