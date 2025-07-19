import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InfoIcon } from "lucide-react"
import GridBackground from "@/components/GridBackground"
import type { Profile } from "@/types/profile"
import ProfileClient from "@/components/ProfileClient"

export default async function ProtectedPage() {

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log('Supabase getUser:', { data, error });

  if (error || !data?.user) {
    console.log('Redirecting: no user or error');
    redirect("/auth/login");
  }

  // Get the session and access token in a more robust way
  const sessionRes = await supabase.auth.getSession();
  const token = sessionRes.data.session?.access_token;
  console.log('Supabase getSession:', sessionRes);
  if (!token) {
    console.log('Redirecting: no token');
    redirect("/auth/login");
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) throw new Error("Missing API_URL in environment");

  console.log('Token sent to API:', token);
  const res = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  console.log('Profile fetch status:', res.status);
  let profile: Profile | null = null;
  try {
    profile = res.ok ? await res.json() : null;
  } catch (err) {
    console.error('Error parsing profile response:', err);
  }
  console.log('Profile:', profile);

  if (!profile) {
    console.log('Redirecting: no profile');
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full min h-screen flex flex-col gap-12">
      <ProfileClient profile={profile} token={token!} />
    </div>
  )
}
