"use client";

import React from "react";
import { defineStepper } from "@stepperize/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";
import { FrameworkGrid } from "./framework-grid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const { steps } = defineStepper(
  {
    id: "framework",
    title: "Choose your framework",
    description: "Select the framework you want to use",
  },
  {
    id: "install",
    title: "Install the package",
    description: "Install the Clerk package for your framework",
  },
  {
    id: "environment",
    title: "Set up environment variables",
    description: "Configure your environment variables",
  },
  {
    id: "middleware",
    title: "Update your middleware",
    description: "Set up the Clerk middleware",
  },
);

export function Stepper() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 rounded-lg bg-gray-900/50 p-8">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-white">Authentication Setup</h2>
        <span className="text-sm text-gray-400">
          Total Steps: {steps.length}
        </span>
      </div>
      <div className="flex gap-2">
        {/* Contenedor flex para que los elementos tengan la misma proporción */}
        <nav aria-label="Authentication Steps" className="group w-full flex-1">
          <ol
            className="flex w-full flex-col gap-6"
            aria-orientation="vertical"
          >
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="default"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white"
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium text-white">
                    {step.title}
                  </span>
                </li>
                {index < steps.length - 1 && (
                  <div className="pl-[15px]">
                    <Separator
                      orientation="vertical"
                      className="h-48 w-[1px] bg-cyan-500"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>

        <div className="w-4/6 flex-1 space-y-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-lg bg-[#1C1C1C] p-6"
              id={step.id}
            >
              <h3 className="text-lg font-medium text-white">{step.title}</h3>
              <p className="mb-6 text-sm text-gray-400">{step.description}</p>

              {step.id === "framework" && <FrameworkGrid />}
              {step.id === "install" && (
                <Tabs defaultValue="npm" className="w-full">
                  <TabsList className="mb-4 w-full justify-start space-x-6 border-b border-gray-800 bg-transparent p-0">
                    {["npm", "yarn", "pnpm", "bun"].map((tool) => (
                      <TabsTrigger
                        key={tool}
                        value={tool}
                        className="border-b-2 border-transparent bg-transparent px-4 pb-3 font-mono text-gray-400 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-500"
                      >
                        {tool}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="rounded-lg bg-[#161616] p-4">
                    <div className="mb-2 text-sm text-gray-400">terminal</div>
                    <TabsContent value="npm">
                      <CodeBlock
                        language="bash"
                        code="npm install @rccpr/sdk"
                      />
                    </TabsContent>
                    <TabsContent value="yarn">
                      <CodeBlock language="bash" code="yarn add @rccpr/sdk" />
                    </TabsContent>
                    <TabsContent value="pnpm">
                      <CodeBlock language="bash" code="pnpm add @rccpr/sdk" />
                    </TabsContent>
                    <TabsContent value="bun">
                      <CodeBlock language="bash" code="bun add @rccpr/sdk" />
                    </TabsContent>
                  </div>
                </Tabs>
              )}
              {step.id === "environment" && (
                <>
                  <CodeBlock
                    language="bash"
                    code={`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_•••••••••••••••••
CLERK_SECRET_KEY=sk_test_•••••••••••••••••`}
                  />
                  <p className="mt-4 text-sm text-gray-400">
                    Add these keys to your{" "}
                    <code className="rounded bg-gray-800 px-1">.env.local</code>{" "}
                    file
                  </p>
                </>
              )}
              {step.id === "middleware" && (
                <CodeBlock
                  language="typescript"
                  code={`import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/webhook"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
