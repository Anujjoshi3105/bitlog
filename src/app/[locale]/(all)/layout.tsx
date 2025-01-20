import Header from "@/components/site/site-header";
import Footer from "@/components/site/site-footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
