import { getTranslations } from "next-intl/server";
import { verifyCredentialsEmail } from "@/actions/auth/verify";
import { Link } from "@/i18n/routing";
import { findVerificationTokenByToken } from "@/utils/verificationToken";
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.auth.verify.title,
  description: pages.auth.verify.description,
};

type VerificationStatus = "success" | "error" | "invalid" | "expired";

interface StatusConfig {
  icon: typeof CheckCircle;
  iconColor: string;
  title: string;
  description: string;
  buttonHref: string;
  buttonText: string;
}

const STATUS_ROUTES = {
  success: "/dashboard",
  error: "/auth/register",
  invalid: "/auth/register",
  expired: "/auth/register",
} as const;

function VerificationStatus({
  status,
  t,
}: {
  status: VerificationStatus;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const getStatusConfig = (status: VerificationStatus): StatusConfig =>
    ({
      success: {
        icon: CheckCircle,
        iconColor: "text-green-500",
        title: t("Success.title"),
        description: t("Success.description"),
        buttonHref: STATUS_ROUTES.success,
        buttonText: t("Success.btn.label"),
      },
      error: {
        icon: XCircle,
        iconColor: "text-red-500",
        title: t("Error.title"),
        description: t("Error.description"),
        buttonHref: STATUS_ROUTES.error,
        buttonText: t("Error.btn.label"),
      },
      invalid: {
        icon: AlertCircle,
        iconColor: "text-orange-500",
        title: t("Invalid.title"),
        description: t("Invalid.description"),
        buttonHref: STATUS_ROUTES.invalid,
        buttonText: t("Invalid.btn.label"),
      },
      expired: {
        icon: Clock,
        iconColor: "text-yellow-500",
        title: t("Expired.title"),
        description: t("Expired.description"),
        buttonHref: STATUS_ROUTES.expired,
        buttonText: t("Expired.btn.label"),
      },
    }[status]);

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <StatusIcon className={`h-16 w-16 ${config.iconColor}`} />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {config.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-center">{config.description}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={config.buttonHref}>
            <Button className="mt-4">{config.buttonText}</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export default async function VerificationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const t = await getTranslations("Auth.Verify");
  const { token } = await params;
  try {
    const verificationToken = await findVerificationTokenByToken(token);

    if (!verificationToken) {
      return <VerificationStatus status="invalid" t={t} />;
    }

    if (new Date(verificationToken.expires) < new Date()) {
      return <VerificationStatus status="expired" t={t} />;
    }

    const res = await verifyCredentialsEmail(token);
    return (
      <VerificationStatus status={res.success ? "success" : "error"} t={t} />
    );
  } catch (error) {
    console.error("Verification error:", error);
    return <VerificationStatus status="error" t={t} />;
  }
}
