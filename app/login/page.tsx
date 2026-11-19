import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function signIn(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/login?error=missing");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/login?error=invalid");
  redirect("/account");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="min-h-screen bg-[#f5f7fa] px-4 py-12">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-2xl font-black tracking-tight text-[#102a43]">NOVA<span className="text-[#e9872c]">MART</span></Link>
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#b85d0b]">Welcome back</p>
          <h1 className="mt-2 text-2xl font-black text-[#102a43]">Sign in to your account</h1>
          <p className="mt-2 text-sm text-slate-500">Access your orders, profile and saved items.</p>
          {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error === "missing" ? "Enter your email and password." : "We couldn't sign you in. Check your details and try again."}</p>}
          <form action={signIn} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Email address<input required name="email" type="email" autoComplete="email" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#e9872c]" placeholder="you@example.com"/></label>
            <label className="block text-sm font-semibold text-slate-700">Password<input required name="password" type="password" autoComplete="current-password" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#e9872c]" placeholder="Your password"/></label>
            <button className="w-full rounded-lg bg-[#102a43] px-4 py-3 text-sm font-bold text-white hover:bg-[#183c5c]">Sign in</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">New to Nova Mart? <Link href="/signup" className="font-bold text-[#b85d0b]">Create an account</Link></p>
          <p className="mt-5 text-center text-xs text-slate-400"><Link href="/" className="hover:text-[#102a43]">← Back to shopping</Link></p>
        </section>
      </div>
    </main>
  );
}
