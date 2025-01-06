import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { findVerificationTokenByToken } from "@/utils/verificationToken";
import { AlertCircle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResetForm from "@/sections/Auth/ResetForm";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const t = await getTranslations("Auth.ResetPassword");
  const { token } = await params;
  const verificationToken = await findVerificationTokenByToken(token);

  if (!verificationToken || new Date(verificationToken.expires) < new Date()) {
    const status = verificationToken ? "Expired" : "Invalid";
    return <VerificationStatus status={status} t={t} />;
  }

  return (
    <main>
      <ResetForm email={verificationToken.identifier} token={token} />
    </main>
  );
}

type VerificationStatusProps = {
  status: "Invalid" | "Expired";
  t: Awaited<ReturnType<typeof getTranslations>>;
};

function VerificationStatus({ status, t }: VerificationStatusProps) {
  const config = {
    Invalid: {
      icon: AlertCircle,
      iconColor: "text-orange-500",
      title: t("Status.Invalid.title"),
      description: t("Status.Invalid.description"),
      btn: t("Status.Invalid.btn"),
    },
    Expired: {
      icon: Clock,
      iconColor: "text-yellow-500",
      title: t("Status.Expired.title"),
      description: t("Status.Expired.description"),
      btn: t("Status.Expired.btn"),
    },
  }[status];

  const Icon = config.icon;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="text-center">
          <Icon className={`h-16 w-16 mx-auto ${config.iconColor}`} />
          <CardTitle className="text-2xl font-bold mt-4">
            {config.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{config.description}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/forgot-password">
            <Button>{config.btn}</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
