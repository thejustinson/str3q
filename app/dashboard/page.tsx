import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DashboardClient } from "@/components/DashboardClient";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Check if profile exists and has a username
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.username) {
    redirect("/dashboard/onboarding");
  }

  // Fetch their initial tasks
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', user.id);

  // Safely fetch today's completions for the active user
  const todayStart = new Date().toISOString().split('T')[0];
  const { data: completions } = await supabase
    .from('completions')
    .select('activity_id')
    .eq('user_id', user.id)
    .gte('completed_at', todayStart);

  const completedActivityIds = completions?.map((c: any) => c.activity_id) || [];

  return <DashboardClient user={user} profile={profile} initialActivities={activities || []} initialCompletions={completedActivityIds} />;
}
