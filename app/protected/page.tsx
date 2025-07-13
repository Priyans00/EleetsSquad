import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InfoIcon } from "lucide-react"
import GridBackground from "@/components/GridBackground"
import type { Profile } from "@/types/profile"
import ProfileClient from "@/components/ProfileClient"

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  // Get the session and access token in a more robust way
  const sessionRes = await supabase.auth.getSession();
  const token = sessionRes.data.session?.access_token;
  if (!token) {

    redirect("/auth/login");
  }

  const API_URL = process.env.API_URL;
  if (!API_URL) throw new Error("Missing API_URL in environment");

  const res = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  let profile: Profile | null = null;
  try {
    profile = res.ok ? await res.json() : null;
  } catch (err) {
    console.error('Error parsing profile response:', err);
  }

  if (!profile) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full min h-screen flex flex-col gap-12">
      <ProfileClient profile={profile} token={token!} />
    </div>
  )
}
