import { Suspense } from "react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to Excelify"
      subtitle="Use your Google account to continue."
    >
      <Suspense fallback={<p className="text-center text-sm text-slate-500">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
