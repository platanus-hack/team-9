import { Stepper } from '@/components/stepper'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-[#0D1117] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#234458,#0D1117_50%)]" />
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,163,0.1),transparent_25%)]" />
      
      {/* Content */}
      <div className="relative">
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                Payment Integration
                <br />
                For{' '}
                <span className="relative">
                  All
                  <span className="absolute -right-4 top-0 h-full w-2 bg-[#00FFA3]" />
                </span>
                <br />
                Applications
              </h1>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-transparent hover:bg-[#00FFA3]/10 text-[#00FFA3] border-2 border-[#00FFA3] rounded-full px-8 py-6 text-lg"
                >
                  Get Started For Free
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-[#1C2128] hover:bg-[#1C2128]/80 text-white rounded-full px-8 py-6 text-lg"
                >
                  Talk to Us
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,163,0.2),transparent_70%)]" />
                <img 
                  src="/placeholder.svg" 
                  alt="Hero illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-60">
            {[
              'KIN',
              'OpenStatus',
              'TRIP TO JAPAN',
              're:tune',
              'Prisma',
              'Drizzle ORM',
              'FERMYON',
              'val town'
            ].map((logo) => (
              <div 
                key={logo} 
                className="text-xl font-bold text-white whitespace-nowrap"
              >
                {logo}
              </div>
            ))}
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Integration Steps</h2>
          <Stepper />
        </section>
      </div>
    </div>
  )
}
