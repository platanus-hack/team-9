import { Stepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D1117] text-white">
      {/* Background effects */}
      <Navbar />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#234458,#0D1117_50%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,163,0.1),transparent_25%)]" />

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="flex-1 text-left">
              <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Payment Integration
                <br />
                For{" "}
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
                  className="rounded-full border-2 border-[#00FFA3] bg-transparent px-8 py-6 text-lg text-[#00FFA3] hover:bg-[#00FFA3]/10"
                >
                  Get Started For Free
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full bg-[#1C2128] px-8 py-6 text-lg text-white hover:bg-[#1C2128]/80"
                >
                  Talk to Us
                </Button>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative aspect-square w-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,163,0.2),transparent_70%)]" />
                <img
                  src="/placeholder.svg"
                  alt="Hero illustration"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 items-center justify-items-center gap-12 opacity-60 md:grid-cols-4">
            {[
              "KIN",
              "OpenStatus",
              "TRIP TO JAPAN",
              "re:tune",
              "Prisma",
              "Drizzle ORM",
              "FERMYON",
              "val town",
            ].map((logo) => (
              <div
                key={logo}
                className="whitespace-nowrap text-xl font-bold text-white"
              >
                {logo}
              </div>
            ))}
          </div>
        </section>

        {/* Integration Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Quick Integration Steps
          </h2>
          <Stepper />
        </section>
      </div>
    </div>
  );
}
