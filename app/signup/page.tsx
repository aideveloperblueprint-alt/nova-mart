import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

async function signUp(formData: FormData) {
  "use server";
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!fullName || !email || password.length < 8) redirect("/signup?error=details");
  const supabase = await createClient();
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "https://nova-mart-151u.onrender.com";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { full_name: fullName, phone },
    },
  });
  if (error) redirect("/signup?error=failed");
  if (data.session) redirect("/account");
  redirect("/signup?success=check-email");
}

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const { error, success } = await searchParams;
  return (
    <main className="min-h-screen bg-[#f5f7fa] px-4 py-12">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 text-2xl font-black tracking-tight text-[#102a43]">NOVA<span className="text-[#e9872c]">MART</span></Link>
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#b85d0b]">Join the marketplace</p>
          <h1 className="mt-2 text-2xl font-black text-[#102a43]">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">A Nova Mart account makes shopping and tracking orders easier.</p>
          {success && <p role="status" className="mt-5 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">Account request received. Check your email for the confirmation link before signing in.</p>}
          {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error === "details" ? "Enter your name and email, and choose a password with at least 8 characters." : "We couldn't create the account. The email may already be registered; try signing in."}</p>}
          <form action={signUp} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Full name<input required name="fullName" autoComplete="name" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#e9872c]" placeholder="Your full name"/></label>
            <label className="block text-sm font-semibold text-slate-700">Phone number <span className="font-normal text-slate-400">(optional)</span><input name="phone" type="tel" autoComplete="tel" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#e9872c]" placeholder="+234"/></label>
            <label className="block text-sm font-semibold text-slate-700">Email address<input required name="email" type="email" autoComplete="email" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#e9872c]" placeholder="you@example.com"/></label>
            <label className="block text-sm font-semibold text-slate-700">Password<input required minLength={8} name="password" type="password" autoComplete="new-password" className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#e9872c]" placeholder="At least 8 characters"/></label>
            <button className="w-full rounded-lg bg-[#102a43] px-4 py-3 text-sm font-bold text-white hover:bg-[#183c5c]">Create account</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link href="/login" className="font-bold text-[#b85d0b]">Sign in</Link></p>
        </section>
      </div>
    </main>
  );
}
