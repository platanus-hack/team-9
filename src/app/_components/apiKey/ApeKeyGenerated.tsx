"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"; // Componente de shadcn
import { Form, FormField, FormItem } from "@/components/ui/form"; // Formularios de shadcn
import { toast } from "sonner"; // Importación de Sonner para notificaciones
import { trpc } from "@/trpc/react";

// Schema de validación (actualmente no tiene campos, pero sirve como base para extensiones futuras)

export const ApeKeyGenerated: React.FC = () => {
  const form = useForm();

  const utils = trpc.useUtils();
  // Mutación para generar una nueva API key
  const createApiKeyMutation = trpc.apiKey.create.useMutation();

  // Manejo del formulario
  const onSubmit = async () => {
    console.log("Entro a onSubmit");
    // Usamos toast.promise para manejar el estado de la mutación
    toast.promise(
      createApiKeyMutation.mutateAsync(), // La mutación devuelve una promesa
      {
        loading: "Generando API Key...",
        success: "API Key creada exitosamente.",
        error: "Error al generar API Key",
      },
    );
    await utils.apiKey.get.refetch();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Generar API Key
      </h1>
      <Button disabled={createApiKeyMutation.isPending} onClick={onSubmit}>
        {createApiKeyMutation.isPending ? "Generando..." : "Generar API Key"}
      </Button>
    </div>
  );
};

export default ApeKeyGenerated;
