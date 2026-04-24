import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`)
    }

    // Pass the exact Supabase error back to the URL so we can debug it
    return NextResponse.redirect(`${origin}/?error=${encodeURIComponent(error.message)}`)
  }

  // Handle missing code
  return NextResponse.redirect(`${origin}/?error=no-code-provided`)
}
