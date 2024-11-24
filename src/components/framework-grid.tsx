/* eslint-disable @next/next/no-img-element */

const frameworks = [
  {
    name: "Next.js",
    logo: "/assets/nextjs.svg?height=60&width=60",
    selected: true,
  },
  {
    name: "React",
    logo: "/assets/react.svg?height=60&width=60",
  },
  {
    name: "Remix",
    logo: "/assets/remix.svg?height=60&width=60",
  },
  {
    name: "Astro",
    logo: "/assets/astro.svg?height=60&width=60",
  },
  {
    name: "Node",
    logo: "/assets/react.svg?height=60&width=60",
  },
];

export function FrameworkGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {frameworks.map((framework) => (
        <div
          key={framework.name}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 transition-colors hover:border-primary ${
            framework.selected
              ? "border-primary bg-primary/10"
              : "border-gray-800 bg-gray-900/50 hover:bg-gray-900"
          }`}
        >
          <img
            src={framework.logo}
            alt={framework.name}
            width={60}
            height={60}
            className="mb-2"
          />
          <span className="text-sm font-medium text-gray-300">
            {framework.name}
          </span>
        </div>
      ))}
    </div>
  );
}
