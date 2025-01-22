import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.dashboard.title,
  description: pages.dashboard.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen fixed top-0 left-0">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-scroll">{children}</div>
    </div>
  );
}
