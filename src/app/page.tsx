import { Copy } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

export default function TutorialSteps() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
      {/* Framework Navigation */}
      <nav className="flex items-center gap-8 overflow-x-auto pb-4">
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-sm">Next.js</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="w-12 h-12 bg-[#149ECA] bg-opacity-10 rounded-full flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=24&width=24"
              alt="React"
              width={24}
              height={24}
              className="text-[#149ECA]"
            />
          </div>
          <span className="text-sm">React</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="text-sm">Remix</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center">
            <span className="text-black font-bold">A</span>
          </div>
          <span className="text-sm">Astro</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <span className="text-white">^</span>
          </div>
          <span className="text-sm">Expo</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="w-12 h-12 bg-[#F7DF1E] rounded-full flex items-center justify-center">
            <span className="text-black font-bold">JS</span>
          </div>
          <span className="text-sm">JavaScript</span>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="w-12 h-12 bg-[#E99287] rounded-full flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=24&width=24"
              alt="TanStack"
              width={24}
              height={24}
            />
          </div>
          <span className="text-sm">TanStack Start</span>
        </div>
      </nav>

      {/* Tutorial Steps */}
      <div className="space-y-12 relative">
        {/* Step 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center relative z-10">
                <span className="text-sm font-medium text-blue-600">1</span>
              </div>
              <h2 className="text-xl font-semibold">Set up a React application using Vite</h2>
            </div>
            <p className="text-gray-600">Scaffold your new React application using Vite</p>
          </div>
          
          <Card className="bg-gray-950 text-white p-4 rounded-lg">
            <div className="space-y-4">
              <Tabs defaultValue="npm">
                <TabsList className="bg-transparent border-b border-gray-800">
                  <TabsTrigger 
                    value="npm" 
                    className="text-gray-400 data-[state=active]:text-[#149ECA]"
                  >
                    npm
                  </TabsTrigger>
                  <TabsTrigger 
                    value="yarn"
                    className="text-gray-400 data-[state=active]:text-[#149ECA]"
                  >
                    yarn
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pnpm"
                    className="text-gray-400 data-[state=active]:text-[#149ECA]"
                  >
                    pnpm
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center justify-between group">
                  <code>npm create vite@latest clerk-react -- --template react</code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between group">
                  <code>cd clerk-react</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between group">
                  <code>npm install</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between group">
                  <code>npm run dev</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Connecting line */}
        <div className="absolute left-4 top-8 w-px bg-blue-200 h-[calc(100%-2rem)]" style={{ transform: 'translateX(-50%)' }}></div>

        {/* Step 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center relative z-10">
                <span className="text-sm font-medium text-blue-600">2</span>
              </div>
              <h2 className="text-xl font-semibold">Install <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">@clerk/clerk-react</code></h2>
            </div>
            <p className="text-gray-600">The package to use with Clerk and React.</p>
          </div>
          
          <Card className="bg-gray-950 text-white p-4 rounded-lg">
            <div className="space-y-4">
              <Tabs defaultValue="npm">
                <TabsList className="bg-transparent border-b border-gray-800">
                  <TabsTrigger 
                    value="npm" 
                    className="text-gray-400 data-[state=active]:text-[#149ECA]"
                  >
                    npm
                  </TabsTrigger>
                  <TabsTrigger 
                    value="yarn"
                    className="text-gray-400 data-[state=active]:text-[#149ECA]"
                  >
                    yarn
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pnpm"
                    className="text-gray-400 data-[state=active]:text-[#149ECA]"
                  >
                    pnpm
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center justify-between group">
                  <code>npm install @clerk/clerk-react</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

