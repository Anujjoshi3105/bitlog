import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen fixed top-0 left-0 z-[1000] bg-secondary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-scroll">{children}</div>
    </div>
  );
}
