import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  return (
    <div className="h-screen w-full flex justify-center px-12 text-balance text-center items-center">
      {JSON.stringify(session)}
    </div>
  );
}
