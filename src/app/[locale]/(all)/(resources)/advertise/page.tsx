import { Metadata } from "next";
import { pages } from "@/config/site";
import Advertise from "@/components/pages/resources/Advertise";

export const metadata: Metadata = {
  title: pages.advertise.title,
  description: pages.advertise.description,
};

export default function page() {
  return <Advertise />;
}
