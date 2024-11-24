#!/usr/bin/env node

import { Command } from "commander";
import { add } from "@/commads/add";
import dotenv from "dotenv";
import { getPackageInfo } from "@/utils";

dotenv.config();

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
