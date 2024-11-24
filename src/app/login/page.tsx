import { AuthComponent } from "@/components/auth/auth-component";
import { login, signup } from "./_lib/actions";

import { PaySdk } from "@rccpr/sdk";
export default function LoginPage() {
  return <AuthComponent />;
}
