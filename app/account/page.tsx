import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");
  const { data } = await supabase.from("profiles").select("full_name, phone, role").eq("id", user.id).maybeSingle();
  const profile = data as { full_name: string | null; phone: string | null; role: string } | null;
  const displayName = profile?.full_name || user.user_metadata?.full_name || "Nova Mart customer";

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5"><Link href="/" className="text-xl font-black text-[#102a43]">NOVA<span className="text-[#e9872c]">MART</span></Link><form action={signOut}><button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-[#102a43] hover:bg-slate-50">Sign out</button></form></div></header>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#b85d0b]">Your Nova Mart</p>
        <h1 className="mt-2 text-3xl font-black text-[#102a43]">Welcome, {displayName}</h1>
        <p className="mt-2 text-sm text-slate-500">Manage your customer details and keep your shopping journey organised.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-extrabold text-[#102a43]">Account details</h2><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-slate-400">Email</dt><dd className="mt-1 font-semibold text-slate-700">{user.email}</dd></div><div><dt className="text-slate-400">Phone</dt><dd className="mt-1 font-semibold text-slate-700">{profile?.phone || "Not added yet"}</dd></div><div><dt className="text-slate-400">Account type</dt><dd className="mt-1 font-semibold capitalize text-slate-700">{profile?.role || "Customer"}</dd></div></dl></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-extrabold text-[#102a43]">Your shopping</h2><p className="mt-2 text-sm leading-6 text-slate-500">Your order history and saved products will appear here as those marketplace features are connected.</p><Link href="/#featured" className="mt-5 inline-flex rounded-lg bg-[#102a43] px-4 py-3 text-sm font-bold text-white">Continue shopping</Link></section>
        </div>
      </div>
    </main>
  );
}
