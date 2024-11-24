"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/react";
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
import { apikeysType, type EncryptedToken } from "@/service/apikey.model";

export default function PaymentProviderSetup() {
  const { data } = trpc.provider.getProviders.useQuery();
  const [provider, setProvider] = useState<ProviderName | null>(null);

  const form = useForm<EncryptedToken>({
    resolver: zodResolver(apikeysType),
  });

  console.log("Data???", JSON.stringify(data, null, 2));

  const saveTokenMutation = trpc.apiKey.create.useMutation();

  const onSubmit: SubmitHandler<EncryptedToken> = async () => {
    console.log(data);
    try {
      await saveTokenMutation.mutateAsync();
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
