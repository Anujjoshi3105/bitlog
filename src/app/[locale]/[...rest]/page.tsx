import ErrorPage from "@/app/error";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.error.title,
  description: pages.error.description,
};
export default function rest() {
  return <ErrorPage />;
}
