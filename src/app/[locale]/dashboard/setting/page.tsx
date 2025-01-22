import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.dashboard.setting.title,
  description: pages.dashboard.setting.description,
};

export default function SettingPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      Setting
    </div>
  );
}
