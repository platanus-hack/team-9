import { EncryptedToken, EncryptedTokens } from "@/components/payments-provider";
import { db } from "@/server/db";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import {ProviderToken } from "@prisma/client";

class ApikeyService {
  generateApikeyToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
    }


    generateProviderTokens(providerToken: EncryptedToken): ProviderToken['token'] {
           return encodeHexLowerCase(
           sha256(new TextEncoder().encode(JSON.stringify(providerToken)))
    )}
    
    async createProviders(encryptedTokens: EncryptedTokens, userId: ProviderToken['userId']): Promise<void> {
        const data = encryptedTokens.map((provider) => {
            console.log(provider)
            return {
                userId, providerName: provider.provider, token: this.generateProviderTokens(provider)
            }
        })
        console.log(data)
        await db.providerToken.createMany({ data })
      }

//   async validateProviderToken(token: string): Promise<SessionValidationResult> {
//     const sessionId = encodeHexLowerCase(
//       sha256(new TextEncoder().encode(token))
//     );
//     const session = await getSessionByIdDataAccess(sessionId);
//     if (!session) {
//       return { session: null, user: null };
//     }

//     if (Date.now() >= session.expiresAt.getTime()) {
//       await deleteSessionByIdDataAccess(session.id);
//       return { session: null, user: null };
//     }

//     const user = await findUserByIdDataAccess(session.userId);
//     if (!user) {
//       await deleteSessionByIdDataAccess(session.id);
//       return { session: null, user: null };
//     }

//     if (
//       Date.now() >=
//       session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS
//     ) {
//       session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
//       await updateSessionExpirationDataAccess(session.id, session.expiresAt);
//     }

//     return { session, user };
//   }
}

export const apikeyService = new ApikeyService();