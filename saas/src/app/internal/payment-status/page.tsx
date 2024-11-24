import { PaymentStatusCard } from "@/components/payment-status-card";

import { z } from "zod";

export default async function PaymentStatusPage(props: {
  searchParams: Promise<unknown>;
}) {
  const { publicKey, payment_intent_client_secret } = z
    .object({
      publicKey: z.string(),
      payment_intent_client_secret: z.string(),
      redirect_status: z.string().optional(),
    })
    .parse(await props.searchParams);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-blob rounded-full bg-blue-300 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-2000 absolute bottom-1/4 right-1/4 h-64 w-64 animate-blob rounded-full bg-pink-300 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-4000 absolute bottom-1/3 left-1/3 h-64 w-64 animate-blob rounded-full bg-yellow-300 mix-blend-multiply blur-xl filter"></div>
      </div>
      <PaymentStatusCard
        publicKey={publicKey}
        clientSecret={payment_intent_client_secret}
      />
    </div>
  );
}
