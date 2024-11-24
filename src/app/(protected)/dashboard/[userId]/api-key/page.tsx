"use client";

import { ApiKeysContent } from "@/app/_components/apiKey/ApiKeyContent";
import { useParams } from "next/navigation";

const ApiKeysPage = () => {
  const router = useParams<{ userId: string }>();
  const userId = router.userId;

  return (
    <div>
      {/* Aquí colocarás el contenido relacionado con las API Keys */}
      <ApiKeysContent />
    </div>
  );
};

export default ApiKeysPage;
