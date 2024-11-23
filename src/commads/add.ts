import ora from "ora";
import prompts from "prompts";
import { Command } from "commander";
import { existsSync, promises as fs } from "fs";

import { getRegistry } from "@/commads/utils/getRegistry";
import { addOptionsSchema } from "@/commads/validations";
import { resolveTree } from "@/commads/functions";
import { getPackageInfo, logger } from "@/utils";
import { fetchComponents } from "@/commads/functions";
import { execa } from "execa";

export const add = new Command()
  .command("add")
  .description("Add components for you project")
  .argument("[components...]", "The component you want to add")
  .action(async (components) => {
    const options = addOptionsSchema.parse({ components });

    const registryIndex = await getRegistry();

    let selectedComponents = options.components?.length
      ? options.components
      : registryIndex.map((entry) => entry.name);

    if (!options.components?.length) {
      const { components } = await prompts({
        type: "multiselect",
        name: "components",
        message: "Which components would you like to add?",
        hint: "Space to select. A to toggle all. Enter to submit.",
        instructions: false,
        choices: registryIndex.map((entry) => ({
          title: entry.name,
          value: entry.name,
          selected: options.components?.includes(entry.name),
        })),
      });
      selectedComponents = components;
    }

    if (!selectedComponents?.length) {
      logger.warn("No components selected. Exiting.");
      process.exit(0);
    }

    const tree = await resolveTree(registryIndex, selectedComponents);
    const componentsTree = await fetchComponents(tree);
    if (!componentsTree.length) {
      logger.warn("Selected components not found. Exiting.");
      process.exit(0);
    }

    const spinner = ora("Installing dependencies").start();
    for (const component of componentsTree) {
      spinner.text = `Installing ${component.name}...`;
      const componentType = component.type.split(":");
      const folderPath = componentType[0];
      const componentMain = componentType[1];

      const targetPath = `./app/src/components/${folderPath}`;
      if (!existsSync(targetPath)) {
        await fs.mkdir(targetPath, { recursive: true });
      }

      // generate overwriting files
      const existFile = component.files.map((file) => {
        return existsSync(`${targetPath}/${file.name}`);
      });
      if (existFile.includes(true)) {
        if (selectedComponents.includes(componentMain)) {
          spinner.stop();
          const { overwrite } = await prompts({
            type: "confirm",
            name: "overwrite",
            message: `Files already exist for ${component.name}. Overwrite?`,
            initial: false,
          });
          if (!overwrite) {
            spinner.warn("Skipping component");
            continue;
          }

          spinner.start(`Installing ${component.name}...`);
        } else {
          continue;
        }
      }

      for (const file of component.files) {
        await fs.writeFile(`${targetPath}/${file.name}`, file.content);
      }

      const packageManager = getPackageInfo();

      if (component.dependencies?.length) {
        await execa("bun", ["add", ...component.dependencies]);
      }

      if (component.devDependencies?.length) {
        await execa("bun", ["add", "-D", ...component.devDependencies]);
      }
    }
    spinner.succeed("Done.");
    spinner.stop();
  });
