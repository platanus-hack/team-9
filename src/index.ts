import { Command } from "commander";
import { add } from "@/commads/add";
import dotenv from "dotenv";
import { getPackageInfo } from "@/utils";
import ora from "ora";

dotenv.config();
export const spinner = ora();

const main = async () => {
  const packageInfo = getPackageInfo();
  const program = new Command();

  program.version(
    packageInfo.version || "1.0.0",
    "-v, --version",
    "display the version number"
  );

  program.addCommand(add);

  program.parse();
};

main();

// import { readFileSync } from "fs";
// import path from "path";
// function transformFileToRawString(filePath: string): string {
//   if (!filePath.endsWith(".ts") && !filePath.endsWith(".tsx")) {
//     throw new Error("File must be a .ts or .tsx file");
//   }

//   const fileContent = readFileSync(filePath, "utf-8");
//   return JSON.stringify(fileContent);
// }

// const rawString = transformFileToRawString(
//   "./src/registry/actions/payment-component.ts"
// );
// console.log(rawString);
