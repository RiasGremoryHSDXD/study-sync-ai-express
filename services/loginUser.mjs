import 'dotenv/config'
import { supabase, getAuthenticatedClient } from './supabaseClient.mjs';
import { createClient } from "@supabase/supabase-js";

const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_KEY

export async function logInUser(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    
    if(error) throw new Error(error.message)
    // console.log(data.session.access_token)
    const { session } = data
    if (!session) throw new Error('No session returned from signIn');

    const token = session.access_token
    
    const supabaseUser = getAuthenticatedClient(token)

    const { data: profile, error: profileError} = await supabaseUser
    .from('profiles')
    .select('full_name, role')
    .single()

    if(profileError) throw new Error(`Failed fetching profile: ${profileError.message}`)

    return {session, profile}
}