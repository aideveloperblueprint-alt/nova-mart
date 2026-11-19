import { createClient } from "@/lib/supabase/server";
import {
  ArrowRight, BadgePercent, ChevronDown, Headphones,
  Heart, Laptop, Menu, Search, ShieldCheck, ShoppingBag,
  ShoppingCart, Smartphone, Sparkles, Star, Truck, UserRound, Watch,
  Shirt, Sofa, Gift
} from "lucide-react";

const categories = [
  { name: "Fashion & Clothing", detail: "Style for every day", icon: Shirt },
  { name: "Electronics & Gadgets", detail: "Smart tech, smarter living", icon: Watch },
  { name: "Phones & Accessories", detail: "Stay connected", icon: Smartphone },
  { name: "Computers & Laptops", detail: "Power your ideas", icon: Laptop },
  { name: "Home & Furniture", detail: "Make room for better", icon: Sofa },
  { name: "Beauty & Personal Care", detail: "Your everyday essentials", icon: Sparkles },
];

const products = [
  { name: "Everyday Classic Sneakers", vendor: "Urban Sole", price: "₦38,500", old: "₦49,000", rating: "4.8", badge: "BESTSELLER", image: "photo-1542291026-7eec264c27ff" },
  { name: "Wireless Noise-Cancelling Headphones", vendor: "SoundHaus", price: "₦72,000", old: "₦89,000", rating: "4.7", badge: "HOT DEAL", image: "photo-1505740420928-5e560c06d30e" },
  { name: "Minimal Everyday Wristwatch", vendor: "Time & Co.", price: "₦26,900", old: "", rating: "4.6", badge: "NEW ARRIVAL", image: "photo-1523275335684-37898b6baf30" },
  { name: "Premium Skincare Essentials Set", vendor: "Glow District", price: "₦19,500", old: "₦24,000", rating: "4.9", badge: "TOP RATED", image: "photo-1608248543803-ba4f8c70ae0b" },
];

const imageUrl = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

export default async function Home() {
  const supabase = await createClient();
  const { data: liveCategories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const categoryIcons: Record<string, typeof Shirt> = {
    "fashion-clothing": Shirt,
    "electronics-gadgets": Watch,
    "phones-accessories": Smartphone,
    "computers-laptops": Laptop,
    "home-furniture": Sofa,
    "beauty-personal-care": Sparkles,
  };
  const categoryItems = liveCategories?.length
    ? liveCategories.map((category) => ({
        name: category.name,
        detail: "Explore the collection",
        icon: categoryIcons[category.slug] ?? ShoppingBag,
      }))
    : categories;

  return (
    <main>
      <div className="top-strip">
        <div className="container flex min-h-9 items-center justify-between gap-3">
          <p className="hidden sm:block">Your marketplace for the things that move you.</p>
          <p className="mx-auto sm:mx-0">Free delivery on selected orders <span className="font-bold text-orange-300">· Shop the offers</span></p>
          <p className="hidden sm:block">Need help? <span className="font-semibold text-white">We're here for you</span></p>
        </div>
      </div>

      <header className="site-header">
        <div className="container flex items-center gap-4 py-4">
          <button className="rounded-lg p-2 text-slate-600 md:hidden" aria-label="Open menu"><Menu size={22}/></button>
          <a href="#" className="flex shrink-0 items-center gap-2.5">
            <span className="brand-mark"><ShoppingBag size={23} strokeWidth={2.6}/></span>
            <span className="leading-none"><span className="block text-[22px] font-black tracking-tight text-[#102a43]">NOVA<span className="text-[#e9872c]">MART</span></span><span className="mt-1 block text-[8px] font-bold tracking-[.19em] text-slate-500">SHOP SMARTER. LIVE BETTER.</span></span>
          </a>
          <div className="search-box mx-auto hidden w-full max-w-[510px] md:flex">
            <Search size={18} className="shrink-0 text-slate-400"/>
            <input placeholder="Search for products, brands and more..." aria-label="Search products"/>
            <button className="rounded-md bg-[#102a43] px-4 py-2 text-xs font-bold text-white">Search</button>
          </div>
          <div className="ml-auto flex items-center gap-4 text-[#102a43]">
            <a href="#" className="hidden items-center gap-2 text-xs font-semibold sm:flex"><UserRound size={19}/> <span>Account</span></a>
            <a href="#" className="relative hidden sm:block" aria-label="Wishlist"><Heart size={21}/><span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#ff9f43] text-[9px] font-bold">0</span></a>
            <a href="#" className="relative" aria-label="Shopping cart"><ShoppingCart size={22}/><span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#ff9f43] text-[9px] font-bold">0</span></a>
          </div>
        </div>
        <div className="container pb-3 md:hidden"><div className="search-box"><Search size={18} className="text-slate-400"/><input placeholder="Search Nova Mart..." aria-label="Search products"/></div></div>
        <nav className="hidden border-t border-slate-100 md:block">
          <div className="container flex items-center gap-7 py-3 text-[12px] font-semibold text-slate-600">
            <a href="#categories" className="flex items-center gap-1 text-[#102a43]">Shop by category <ChevronDown size={14}/></a>
            <a href="#deals" className="hover:text-[#b85d0b]">Today's deals</a>
            <a href="#featured" className="hover:text-[#b85d0b]">Featured products</a>
            <a href="#vendors" className="hover:text-[#b85d0b]">Top stores</a>
            <a href="#sell" className="ml-auto text-[#b85d0b]">Sell on Nova Mart <ArrowRight size={14} className="ml-1 inline"/></a>
          </div>
        </nav>
      </header>

      <section className="bg-[#f5f7fa] py-5 sm:py-7">
        <div className="container">
          <div className="hero-art flex items-center" style={{backgroundImage: `url("${imageUrl("photo-1441986300917-64674bd600d8")}")`}}>
            <div className="max-w-xl px-6 py-10 sm:px-12 sm:py-14">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[.14em] text-orange-200"><Sparkles size={13}/> THE NOVA MART EDIT</span>
              <h1 className="max-w-lg text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">Good finds.<br/><span className="text-[#ffb66f]">Great everyday</span> living.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-100">Discover the products you love from sellers you can trust. Everything you need, all in one marketplace.</p>
              <div className="mt-7 flex flex-wrap gap-3"><a href="#featured" className="primary-btn inline-flex items-center gap-2">Explore products <ArrowRight size={16}/></a><a href="#categories" className="rounded-lg border border-white/50 px-5 py-3 text-[13px] font-bold text-white hover:bg-white/10">Browse categories</a></div>
              <div className="mt-8 flex flex-wrap gap-5 text-[11px] font-medium text-slate-100"><span className="flex items-center gap-1.5"><ShieldCheck size={15}/> Trusted sellers</span><span className="flex items-center gap-1.5"><Truck size={15}/> Convenient delivery</span><span className="flex items-center gap-1.5"><BadgePercent size={15}/> Great deals</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-5">
        <div className="container grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="benefit"><span className="benefit-icon"><Truck size={20}/></span><span><strong className="block text-xs text-[#102a43]">Delivery that works for you</strong><span className="text-[11px] text-slate-500">Flexible delivery options across Nigeria</span></span></div>
          <div className="benefit"><span className="benefit-icon"><ShieldCheck size={20}/></span><span><strong className="block text-xs text-[#102a43]">Shop with confidence</strong><span className="text-[11px] text-slate-500">Discover products from approved sellers</span></span></div>
          <div className="benefit"><span className="benefit-icon"><Headphones size={20}/></span><span><strong className="block text-xs text-[#102a43]">Here when you need us</strong><span className="text-[11px] text-slate-500">Friendly support for your shopping journey</span></span></div>
        </div>
      </section>

      <section id="categories" className="container py-12 sm:py-16">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="section-kicker">Find your next favourite</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#102a43] sm:text-3xl">Shop by category</h2><p className="mt-2 text-sm text-slate-500">A little bit of everything, thoughtfully organised.</p></div><a href="#" className="hidden items-center gap-1 text-xs font-bold text-[#b85d0b] sm:flex">View all <ArrowRight size={15}/></a></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categoryItems.map(({name,detail,icon:Icon})=><a href="#" key={name} className="category-card"><span className="category-icon"><Icon size={23}/></span><strong className="block text-[12px] leading-4 text-[#102a43]">{name}</strong><span className="mt-1 block text-[10px] text-slate-500">{detail}</span></a>)}
        </div>
      </section>

      <section id="deals" className="bg-[#fff8f0] py-11 sm:py-14">
        <div className="container">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="section-kicker">Don't miss out</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#102a43] sm:text-3xl">Deals worth discovering</h2><p className="mt-2 text-sm text-slate-500">A few good reasons to treat yourself today.</p></div><a href="#" className="hidden items-center gap-1 text-xs font-bold text-[#b85d0b] sm:flex">See all deals <ArrowRight size={15}/></a></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex min-h-[190px] items-center justify-between overflow-hidden rounded-2xl bg-[#102a43] p-6 text-white"><div className="max-w-[230px]"><span className="text-[10px] font-extrabold tracking-[.16em] text-orange-300">FASHION FINDS</span><h3 className="mt-2 text-2xl font-black">Refresh your<br/>everyday look.</h3><p className="mt-2 text-xs text-slate-300">New-season styles, fresh possibilities.</p><a href="#" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-orange-300">Explore fashion <ArrowRight size={14}/></a></div><div className="h-36 w-32 rounded-xl bg-cover bg-center" style={{backgroundImage:`url("${imageUrl("photo-1483985988355-763728e1935b")}")`}}/></div>
            <div className="flex min-h-[190px] items-center justify-between overflow-hidden rounded-2xl bg-[#f4e8dc] p-6 text-[#102a43]"><div className="max-w-[230px]"><span className="text-[10px] font-extrabold tracking-[.16em] text-[#a95000]">TECH MADE SIMPLE</span><h3 className="mt-2 text-2xl font-black">Upgrade your<br/>everyday tech.</h3><p className="mt-2 text-xs text-slate-600">Smart picks for work, play and everything between.</p><a href="#" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#a95000]">Explore electronics <ArrowRight size={14}/></a></div><div className="h-36 w-32 rounded-xl bg-cover bg-center" style={{backgroundImage:`url("${imageUrl("photo-1498049794561-7780e7231661")}")`}}/></div>
          </div>
        </div>
      </section>

      <section id="featured" className="container py-12 sm:py-16">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="section-kicker">Handpicked for you</p><h2 className="mt-2 text-2xl font-black tracking-tight text-[#102a43] sm:text-3xl">Popular right now</h2><p className="mt-2 text-sm text-slate-500">Explore standout picks from our marketplace.</p></div><a href="#" className="hidden items-center gap-1 text-xs font-bold text-[#b85d0b] sm:flex">Browse all products <ArrowRight size={15}/></a></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {products.map((product,index)=><article key={product.name} className="product-card"><div className="product-image" style={{backgroundImage:`url("${imageUrl(["photo-1542291026-7eec264c27ff","photo-1505740420928-5e560c06d30e","photo-1523275335684-37898b6baf30","photo-1608248543803-ba4f8c70ae0b"][index])}")`}}><span className="product-tag">{product.badge}</span><button className="heart-button" aria-label={`Save ${product.name}`}><Heart size={16}/></button></div><div className="p-3 sm:p-4"><div className="flex items-center gap-1 text-[10px] text-amber-500"><Star size={12} fill="currentColor"/><strong>{product.rating}</strong><span className="text-slate-400">· Seller: {product.vendor}</span></div><h3 className="mt-2 min-h-9 text-xs font-bold leading-5 text-[#102a43] sm:text-[13px]">{product.name}</h3><div className="mt-3 flex flex-wrap items-baseline gap-2"><strong className="text-sm text-[#102a43] sm:text-base">{product.price}</strong>{product.old&&<span className="text-[10px] text-slate-400 line-through">{product.old}</span>}</div><button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#dfe6ed] py-2.5 text-[11px] font-bold text-[#102a43] hover:border-[#ff9f43] hover:bg-[#fff8f0]"><ShoppingCart size={14}/> Add to cart</button></div></article>)}
        </div>
      </section>

      <section id="vendors" className="bg-[#f5f7fa] py-12">
        <div className="container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div><p className="section-kicker">Good businesses. Great finds.</p><h2 className="mt-2 text-2xl font-black text-[#102a43]">Meet the sellers behind the finds.</h2><p className="mt-2 max-w-xl text-sm text-slate-500">Discover independent stores and explore products from sellers across our growing marketplace.</p></div><a href="#" className="primary-btn inline-flex items-center gap-2">Explore stores <ArrowRight size={15}/></a></div>
      </section>

      <section id="sell" className="container py-12 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-orange-100 bg-[#fff8f0] p-6 sm:flex-row sm:items-center sm:p-9"><div className="max-w-xl"><span className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-[.15em] text-[#a95000]"><Gift size={14}/> GROW WITH NOVA MART</span><h2 className="mt-3 text-2xl font-black tracking-tight text-[#102a43] sm:text-3xl">Have products to sell?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Bring your business to a marketplace built to help you reach more customers. Create your store and grow with Nova Mart.</p></div><a href="#" className="primary-btn inline-flex shrink-0 items-center gap-2">Become a seller <ArrowRight size={15}/></a></div>
      </section>

      <footer className="footer pt-11">
        <div className="container grid gap-9 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div><a href="#" className="flex items-center gap-2"><span className="brand-mark"><ShoppingBag size={22}/></span><span className="text-xl font-black text-white">NOVA<span className="text-[#ff9f43]">MART</span></span></a><p className="mt-4 max-w-xs text-xs leading-6 text-slate-400">Everything you need, one marketplace. Discover great products from sellers you can trust.</p></div>
          <div><h3 className="text-xs font-extrabold text-white">Shop</h3><ul className="mt-4 space-y-3 text-xs text-slate-400"><li><a href="#categories">All categories</a></li><li><a href="#featured">Popular products</a></li><li><a href="#deals">Deals & offers</a></li><li><a href="#vendors">Featured stores</a></li></ul></div>
          <div><h3 className="text-xs font-extrabold text-white">Sell on Nova Mart</h3><ul className="mt-4 space-y-3 text-xs text-slate-400"><li><a href="#sell">Become a seller</a></li><li><a href="#">Seller guidelines</a></li><li><a href="#">Seller support</a></li><li><a href="#">Marketplace policies</a></li></ul></div>
          <div><h3 className="text-xs font-extrabold text-white">Need help?</h3><ul className="mt-4 space-y-3 text-xs text-slate-400"><li><a href="#">Contact us</a></li><li><a href="#">Delivery information</a></li><li><a href="#">Returns & refunds</a></li><li><a href="#">FAQs</a></li></ul></div>
        </div>
        <div className="border-t border-white/10 py-5"><div className="container flex flex-col justify-between gap-2 text-[10px] text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} Nova Mart. All rights reserved.</span><span>Made for shoppers across Nigeria.</span></div></div>
      </footer>
    </main>
  );
}
