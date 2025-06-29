import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export const getUser = async (token) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const { data, error } = await supabase
    .from('enrollments')
    .select('*')

  if (error) throw new Error(error.message)

  return data
}
