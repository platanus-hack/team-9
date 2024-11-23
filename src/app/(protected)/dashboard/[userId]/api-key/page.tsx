"use client";

import ApeKeyGenerated from "@/app/_components/apiKey/ApeKeyGenerated";
import { ApiKeysContent } from "@/app/_components/apiKey/ApiKeyContent";
import { useParams } from "next/navigation";

const ApiKeysPage = () => {
  const router = useParams<{ userId: string }>();
  const userId = router.userId;

  return (
    <div>
      <h1>API Keys for User: {userId}</h1>
      {/* Aquí colocarás el contenido relacionado con las API Keys */}
      <ApeKeyGenerated />
      <ApiKeysContent />
    </div>
  );
};

export default ApiKeysPage;
