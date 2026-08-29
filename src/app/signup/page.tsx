import { Suspense } from "react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout title="Create your Excelify account">
      <Suspense fallback={<p className="text-center text-sm text-slate-500">Loading...</p>}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}
