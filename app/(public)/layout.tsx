import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSite } from '@/lib/data';
import { isSupabaseConfigured } from '@/lib/supabase';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <>
      {!isSupabaseConfigured && <div className="preview-flag">Preview ng Stallion para sa TWIRL Project. Placeholder pa ang ilang content.</div>}
      <Navbar />
      <main>{children}</main>
      <Footer site={site} />
    </>
  );
}
