import { supabase } from "./supabaseClient.mjs";

export async function addUSer(email, password, full_name, role) {
  console.log("Email: ", email)
  console.log("Password: ", password)
  console.log("Full name: ", full_name)
  console.log("Role: ", role)
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })

  console.log("CARDO DALISAY: ")
  console.log("Email: ", email)
  console.log("Password: ", password)
  console.log("Full name: ", full_name)
  console.log("Role: ", role)
  if (authError) throw new Error("WTF", authError.message)

  console.log("RIAS GREMORY")
  const userID = authData.user.id
  console.log("Full name: ", full_name)
  console.log("Role: ", role)
  console.log("Email: ", email)
  console.log("Password: ", password)
  const { error: profileError } = await supabase.rpc('insert_user_profile', {
    userid: userID,
    full_name,
    role
  })

  console.log("MELIODAS")

  if (profileError) throw new Error(`Profile insert failed: ${profileError.message}`)

  return {
    user: authData.user,
    profile: { id: userID, full_name, role }
  }
}
