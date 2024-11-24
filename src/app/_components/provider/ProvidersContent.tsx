"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FactoryIcon, MergeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apikeysTypes } from "@/service/apiKey.model";
import { trpc } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  providers: apikeysTypes,
});

type FormValues = z.infer<typeof formSchema>;

export function ProvidersForm({ userId }: { userId: string }) {
  const router = useRouter();
  const { mutateAsync, isPending } =
    trpc.provider.createProviders.useMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providers: [
        { provider: "MERCADOPAGO", active: false, api_key: "" },
        { provider: "FINTOC", active: false, api_key: "", secret_key: "" },
      ],
    },
  });

  async function onSubmit(values: FormValues) {
    // Filtramos los proveedores antes de enviarlos
    const filteredProviders = values.providers.filter((provider) => {
      if (provider.active) {
        if (provider.provider === "MERCADOPAGO") {
          return provider.api_key.trim() !== ""; // MercadoPago requiere api_key
        } else if (provider.provider === "FINTOC") {
          return (
            provider.api_key.trim() !== "" && provider.secret_key.trim() !== ""
          ); // Fintoc requiere api_key y secret_key
        }
      }
      return false;
    });

    if (filteredProviders.length === 0) {
      toast.error("Please provide required keys for active providers.");
      return;
    }

    // Aquí puedes hacer el submit
    toast.promise(
      (async () => {
        await mutateAsync({ encryptedTokens: filteredProviders });
        router.push(`/dashboard/${userId}/api-key`);
      })(),
      {
        loading: "Creating providers...",
        success: "Providers created successfully.",
        error: "Error creating providers",
      },
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Configure Your Providers</CardTitle>
        <CardDescription>
          Manage your integrations with providers like Mercado Pago and Fintoc.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* MercadoPago Provider */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="providers.0.active"
                render={({ field: activeField }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        <div className="flex items-center space-x-2">
                          <MergeIcon className="h-4 w-4" />
                          <span>Mercado Pago</span>
                        </div>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={activeField.value}
                        onCheckedChange={activeField.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Campos de Mercado Pago */}
              {form.watch("providers.0.active") && (
                <>
                  <FormField
                    control={form.control}
                    name="providers.0.api_key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            {/* Fintoc Provider */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="providers.1.active"
                render={({ field: activeField }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        <div className="flex items-center space-x-2">
                          <FactoryIcon className="h-4 w-4" />
                          <span>Fintoc</span>
                        </div>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={activeField.value}
                        onCheckedChange={activeField.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Campos de Fintoc */}
              {form.watch("providers.1.active") && (
                <>
                  <FormField
                    control={form.control}
                    name="providers.1.api_key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="providers.1.secret_key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Key</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              Save Providers
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
