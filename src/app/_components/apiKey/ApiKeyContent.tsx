"use client";

import * as React from "react";
import { Copy, Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner"; // Importar toast de Sonner para las notificaciones
import { trpc } from "@/trpc/react"; // TRPC para las mutaciones
import dayjs from "dayjs";

export function ApiKeysContent() {
  const [selectedKey, setSelectedKey] = React.useState("secret");

  const utils = trpc.useUtils(); // Usamos el hook de utilidad para el refetch

  const { data: apiKeys } = trpc.apiKey.get.useQuery(); // Suponiendo que tienes esta query
  const { mutateAsync: rollApiKey } = trpc.apiKey.roll.useMutation();
  const { mutateAsync: deleteApiKey } = trpc.apiKey.delete.useMutation();

  const formattedDate = dayjs(apiKeys?.createdAt ?? new Date()).format(
    "MMM DD, YYYY, hh:mm A",
  );
  // Mutación para generar una nueva API key
  const {mutateAsync: createApiKeyMutation} = trpc.apiKey.create.useMutation();
  
  const handleGenerateKey = () => {
    toast.promise(
      (async () => {
        await createApiKeyMutation(), // Llamas a la mutación para cambiar la API key
        await utils.apiKey.get.refetch();
      })(),
      {
    loading: "Generando API Key...",
    success: "API Key creada exitosamente.",
    error: "Error al generar API Key",
  },
    );
  };
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleRollKey = () => {
    toast.promise(
      (async () => {
        await rollApiKey(), // Llamas a la mutación para cambiar la API key
        await utils.apiKey.get.refetch();
      })(),
      {
        loading: "Rolling the API Key...",
        success: "API Key rolled successfully!",
        error: "Failed to roll the API Key",
      }
    )
  };

  const handleDeleteKey = () => {
    toast.promise(
      (async () => {
        await deleteApiKey(), // Llamas a la mutación para borrar la API key
        await utils.apiKey.get.refetch();
      })(),
      {
        loading: "Deleting the API Key...",
        success: "API Key deleted successfully!",
        error: "Failed to delete the API Key",
      })
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
        <p className="text-muted-foreground">View and manage your API keys.</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Quick Copy</h2>
          <p className="text-sm text-muted-foreground">
            Copy your environment variable to your clipboard.
          </p>
        </div>
      </div>

      <div className="relative rounded-lg border bg-muted/50 p-3">
        <pre className="overflow-x-auto font-mono text-sm">
          <code>
            {`PAYMENT_CLI_KEY="${selectedKey === "secret" ? "sk_live_••••••••••••••••" : "pk_live_••••••••••••••••"}"`}
          </code>
        </pre>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2"
          onClick={() =>
            copyToClipboard(`PAYMENT_CLI_KEY="sk_live_example_key"`)
          }
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Standard Keys</h2>
          <Button
            variant="outline"
            onClick={handleGenerateKey}
          >
            Create new key
          </Button>
        </div>
        <div className="mt-4 rounded-lg border">
          <div className="grid grid-cols-3 gap-4 p-4 font-medium">
            <div>Key</div>
            <div>Created</div>
            <div className="text-right">Actions</div>
          </div>
          {apiKeys &&
          <div className="border-t">
            <div
              className="grid grid-cols-3 gap-4 p-4"
              key={apiKeys?.id ?? "N/A"}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono">{apiKeys?.token}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copyToClipboard(apiKeys?.token ?? "")}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div>{formattedDate}</div>
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => copyToClipboard(apiKeys?.token ?? "")}
                    >
                      Copy key
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRollKey()}>
                      Roll key
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDeleteKey()}
                    >
                      Delete key
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>   
          }
        </div>
      </div>
    </div>
  );
}
