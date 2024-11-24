"use client";

import { ProvidersForm } from "@/app/_components/provider/ProvidersContent";
import { useParams } from "next/navigation";

const ProvidersPage = () => {
  const router = useParams<{ userId: string }>();
  const userId = router.userId;

  return (
    <div>
      {/* Aquí colocarás el contenido relacionado con las API Keys */}
      <ProvidersForm userId={userId} />
    </div>
  );
};

export default ProvidersPage;
