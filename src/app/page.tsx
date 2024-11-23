import { Stepper } from "@/components/stepper";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Get Started with Authentication
          </h1>
          <p className="text-lg text-gray-400">
            Follow these steps to add authentication to your application
          </p>
        </div>

        <Stepper />
      </div>
    </div>
  );
}
