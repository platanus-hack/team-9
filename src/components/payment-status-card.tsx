"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  AlertCircle,
  Info,
  CreditCard,
  Calendar,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { match } from "ts-pattern";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type PaymentStatus = "succeeded" | "processing" | "requires_payment_method";

interface StatusConfig {
  text: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const statusConfigs: Record<PaymentStatus, StatusConfig> = {
  succeeded: {
    text: "Payment succeeded",
    icon: <CheckCircle className="h-16 w-16" />,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  processing: {
    text: "Your payment is processing",
    icon: <Info className="h-16 w-16" />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  requires_payment_method: {
    text: "Payment unsuccessful",
    icon: <AlertCircle className="h-16 w-16" />,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const loadShit = async (publicKey: string, clientSecret: string) => {
  const stripe = await loadStripe(publicKey);
  if (!stripe) {
    console.error("Failed to load Stripe");
    notFound();
  }
  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  if (!paymentIntent) {
    console.error("Failed to retrieve payment intent");
    notFound();
  }

  const status = match(paymentIntent.status)
    .with("succeeded", () => "succeeded" as const)
    .with("canceled", () => "requires_payment_method" as const)
    .otherwise(() => "processing" as const);
  return { stripe, paymentIntent, status };
};

export function PaymentStatusCard({
  publicKey,
  clientSecret,
}: {
  publicKey: string;
  clientSecret: string;
}) {
  const info = useQuery({
    queryKey: ["todos"],
    queryFn: () => loadShit(publicKey, clientSecret),
  });

  if (info.isLoading) {
    return <div>Loading...</div>;
  }
  if (info.isError) {
    return <div>Error</div>;
  }
  if (!info.data) {
    notFound();
  }
  const status = info.data.status;
  const paymentIntent = info.data.paymentIntent;

  const { text, icon, color, bgColor } = statusConfigs[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6 text-center">
            <motion.div
              className={`${bgColor} rounded-full p-4 ${color}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {icon}
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800">{text}</h2>
            <p className="text-xl text-gray-600">
              {status === "succeeded"
                ? "Thank you for your payment."
                : status === "processing"
                  ? "Please wait while we confirm your payment."
                  : "Please check your payment details and try again."}
            </p>
            <div className="w-full border-t border-gray-200 pt-6">
              <h3 className="mb-4 text-xl font-semibold">
                Transaction details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="mr-2 h-5 w-5" />
                    <span>Amount:</span>
                  </div>
                  <span className="font-semibold">
                    {formatter.format(paymentIntent.amount / 10)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Date:</span>
                  </div>
                  <span className="font-semibold">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <User className="mr-2 h-5 w-5" />
                    <span className="line-clamp">ID:</span>
                  </div>
                  <span className="ml-4 truncate font-semibold">
                    {paymentIntent.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
