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
import { apikeysTypes, type EncryptedTokens } from "@/service/apiKey.model";

export function ProvidersForm() {
  const form = useForm<EncryptedTokens>({
    resolver: zodResolver(apikeysTypes),
    defaultValues: [
      { provider: "MERCADOPAGO", active: false, api_key: "" },
      { provider: "FINTOC", active: false, api_key: "", secret_key: "" },
    ],
  });

  function onSubmit(values: EncryptedTokens) {
    console.log(values);
  }

  console.log("getValues", form.formState.errors);

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
            {/* Iterar sobre los campos */}
            {form.getValues().map((field, index) => (
              <div key={field.provider} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`${index}.active`}
                  render={({ field: enabledField }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          <div className="flex items-center space-x-2">
                            {form.getValues(`${index}.provider`) ===
                            "MERCADOPAGO" ? (
                              <MergeIcon className="h-4 w-4" />
                            ) : (
                              <FactoryIcon className="h-4 w-4" />
                            )}
                            <span>
                              {form.getValues(`${index}.provider`) ===
                              "MERCADOPAGO"
                                ? "Mercado Pago"
                                : "Fintoc"}
                            </span>
                          </div>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={enabledField.value}
                          onCheckedChange={enabledField.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch(`${index}.active`) && (
                  <>
                    <FormField
                      control={form.control}
                      name={`${index}.api_key`}
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
                    {form.getValues(`${index}.provider`) === "FINTOC" && (
                      <FormField
                        control={form.control}
                        name={`${index}.secret_key`}
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
                    )}
                  </>
                )}
              </div>
            ))}

            <Button type="submit" className="w-full">
              Save Providers
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
