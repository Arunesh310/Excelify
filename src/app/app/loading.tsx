export default function AppLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="flex flex-col items-center gap-3">
        <span
          className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent"
          aria-hidden="true"
        />
        <p className="text-sm text-slate-600">Loading Excelify...</p>
      </div>
    </div>
  );
}
