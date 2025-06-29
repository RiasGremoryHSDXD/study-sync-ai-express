import { supabase } from "./supabaseClient.mjs";

export async function addUSer(email, password, full_name, role) {

  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })

  if (authError) throw new Error(authError.message)

  const userID = authData.user.id
  const { error: profileError } = await supabase.rpc('insert_user_profile', {
    userid: userID,
    full_name,
    role
  })

  if (profileError) throw new Error(`Profile insert failed: ${profileError.message}`)

  return {
    user: authData.user,
    profile: { id: userID, full_name, role }
  }
}
