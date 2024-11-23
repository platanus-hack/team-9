"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { z } from "zod";
import { ProviderName } from "@prisma/client";

// ShadCN components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Define Zod schemas
export const mercadoPagoType = z.object({
  provider: z.literal(ProviderName.MERCADOPAGO),
  api_key: z.string().min(1, "Access Token is required"),
});

export const fintocType = z.object({
  provider: z.literal(ProviderName.FINTOC),
  api_key: z.string().min(1, "Access Token is required"),
  secret_key: z.string().min(1, "Secret Key is required"),
});

export const apikeysType = z.discriminatedUnion("provider", [
  mercadoPagoType,
  fintocType,
]);

export const apikeysTypes = z.array(apikeysType);

export type EncryptedToken = z.infer<typeof apikeysType>;
export type EncryptedTokens = z.infer<typeof apikeysTypes>;

export default function PaymentProviderSetup() {
  const [provider, setProvider] = useState<ProviderName | null>(null);

  const form = useForm<EncryptedToken>({
    resolver: zodResolver(apikeysType),
  });

  const saveTokenMutation = api.post.saveApiKey.useMutation();

  const onSubmit: SubmitHandler<EncryptedToken> = async (data) => {
    console.log(data);
    try {
      await saveTokenMutation.mutateAsync([data]);
      alert("Token guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar el token:", error);
      alert("Error al guardar el token");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h2 className="mb-4 text-2xl font-bold">
        Configuración del Proveedor de Pago
      </h2>

      {/* Provider Selection */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Select Provider */}
          <FormField
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecciona un proveedor:</FormLabel>
                <Select
                  onValueChange={(value: ProviderName) => {
                    setProvider(value);
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ProviderName.MERCADOPAGO}>
                      MercadoPago
                    </SelectItem>
                    <SelectItem value={ProviderName.FINTOC}>Fintoc</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Fields for Selected Provider */}
          {provider === ProviderName.MERCADOPAGO && (
            <FormField
              name="api_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Token:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {provider === ProviderName.FINTOC && (
            <>
              <FormField
                name="api_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="secret_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret Key:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  );
}
