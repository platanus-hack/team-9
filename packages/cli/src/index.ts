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
    "display the version number "
  );

  program.addCommand(add);

  program.parse();
};

main();
