import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = createPageMetadata({
  title: "Account",
  description: "View your Excelify account details.",
  path: "/app/account",
});

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
  }).format(new Date(dateString));
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from("profiles").select("name, email, created_at").eq("id", user.id).maybeSingle()
    : { data: null };

  const name =
    profile?.name ||
    (typeof user?.user_metadata?.name === "string" ? user.user_metadata.name : "") ||
    "—";
  const email = profile?.email || user?.email || "—";
  const memberSince = profile?.created_at || user?.created_at || null;
  const authMethod = "Google";

  return (
    <AppShell
      title="Account"
      subtitle="Manage your Excelify account information."
    >
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <dl className="divide-y divide-slate-100">
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <dt className="text-sm font-medium text-slate-500">Name</dt>
              <dd className="text-sm font-semibold text-slate-900">{name}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <dt className="text-sm font-medium text-slate-500">Email</dt>
              <dd className="text-sm font-semibold text-slate-900 break-all">{email}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <dt className="text-sm font-medium text-slate-500">Authentication method</dt>
              <dd className="text-sm font-semibold text-slate-900">{authMethod}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <dt className="text-sm font-medium text-slate-500">Member since</dt>
              <dd className="text-sm font-semibold text-slate-900">
                {memberSince ? formatDate(memberSince) : "—"}
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Your account is linked to Google Sign-In.
        </p>
      </div>
    </AppShell>
  );
}
