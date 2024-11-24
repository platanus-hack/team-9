'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react'

interface CodeTabsProps {
  npm: string
  yarn: string
  pnpm: string
}

export function CodeTabs({ npm, yarn, pnpm }: CodeTabsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Tabs defaultValue="npm" className="w-full">
      <TabsList className="bg-gray-100 dark:bg-gray-800">
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
      </TabsList>
      {Object.entries({ npm, yarn, pnpm }).map(([type, command]) => (
        <TabsContent key={type} value={type} className="relative">
          <pre className="rounded-md bg-gray-900 p-4 text-sm text-gray-50 mt-2">
            <code>{command}</code>
          </pre>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-4"
            onClick={() => copyToClipboard(command)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </TabsContent>
      ))}
    </Tabs>
  )
}

