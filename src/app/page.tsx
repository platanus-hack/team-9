import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { FrameworkGrid } from "@/components/framework-grid";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Get Started with Authentication
          </h1>
          <p className="text-lg text-gray-400">
            Follow these steps to add authentication to your application
          </p>
        </div>

        <div className="mt-16 space-y-8">
          <Card className="border-2 border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm">
                  1
                </span>
                Choose your framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FrameworkGrid />
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm">
                  2
                </span>
                Install the package
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="npm" className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                </TabsList>
                <TabsContent value="npm">
                  <CodeBlock language="bash" code="npm install @clerk/nextjs" />
                </TabsContent>
                <TabsContent value="yarn">
                  <CodeBlock language="bash" code="yarn add @clerk/nextjs" />
                </TabsContent>
                <TabsContent value="pnpm">
                  <CodeBlock language="bash" code="pnpm add @clerk/nextjs" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm">
                  3
                </span>
                Set up environment variables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_••••••••••••••••••••••••••••••••••
CLERK_SECRET_KEY=sk_test_••••••••••••••••••••••••••••••••••`}
              />
              <p className="mt-4 text-sm text-gray-400">
                Add these keys to your{" "}
                <code className="rounded bg-gray-800 px-1">.env.local</code>{" "}
                file
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-800 bg-gray-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm">
                  4
                </span>
                Update your middleware
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/"],
  // Routes that can always be accessed
  ignoredRoutes: ["/api/webhook"],
});
 
export const config = {
  // Match all request paths except for the ones starting with:
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};`}
              />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-primary bg-gray-900/50 shadow-lg">
            <div className="absolute inset-0 bg-primary/10" />
            <CardHeader>
              <CardTitle className="text-white">Ready to go!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Your application is now set up with authentication. Run your
                development server to see it in action.
              </p>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button size="lg" className="gap-2">
                Run your app
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg">
                View documentation
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Need help?</h2>
          <p className="mb-6 text-gray-400">
            Our documentation has everything you need to get started.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#" className="text-primary hover:underline">
              Documentation
            </Link>
            <Link href="#" className="text-primary hover:underline">
              API Reference
            </Link>
            <Link href="#" className="text-primary hover:underline">
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
