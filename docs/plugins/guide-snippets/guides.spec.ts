import { join } from "path";
import { after, before, describe, it } from "mocha";
import { expect } from "chai";
import { parseGuideFile } from "./guide-parser";
import { run } from "./script-runner";

const tempTestExecutionDir = "./temp";

describe("guides", function () {
  describe("get-started", stepByStepGuide("guides/get-started.template"));
  describe(
    "pre-built-docker-containers",
    stepByStepGuide("guides/pre-built-docker-containers.template", {
      originWithBase: `file://${process.cwd()}/static/`,
    })
  );
});

/**
 * Replace string patterns that can change between executions like timestamps, IDs, etc.
 * @param str
 * @return string with the dynamic parts replaced with static values
 */
function replaceDynamicStrings(str: string): string {
  // timestamps that vary in length can have different columns size which means changing number of spaces and changing number of dashes.
  const spacesRegex = / +/g;
  const tablesLinesRegex = /-+/g;
  // Sat, 16 Jul 2022 16:28:36 UTC
  const timeRegex =
    /[A-Z][a-z]{2}, [0-9]{1,2} [A-Z][a-z]{2} [0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2} [A-Z]{3}/g;
  // 2022-07-16T16:28:37.182702796Z
  const timeRegex2 =
    /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3,9}Z/g;
  // 7a23f209751b6dae2691bad30604ff7877e8300665a4f9aa9e65d244fc324763
  const dockerIDRegex = /[0-9a-f]{64}/g;
  // 5b4e0586-c5ba-4f95-bf96-81c893eba2bd
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
  const cursorRegex = /Use -cursor=.*/g;
  return str
    .replace(timeRegex, "Sat, 16 Jul 202git 2 16:28:36 UTC")
    .replace(spacesRegex, " ")
    .replace(tablesLinesRegex, "-")
    .replace(timeRegex2, "2022-07-16T16:28:37.182702796Z")
    .replace(
      dockerIDRegex,
      "7a23f209751b6dae2691bad30604ff7877e8300665a4f9aa9e65d244fc324763"
    )
    .replace(uuidRegex, "5b4e0586-c5ba-4f95-bf96-81c893eba2bd")
    .replace(
      cursorRegex,
      "Use --cursor=AY0eCzxDCmna4PtAB7iQK0o7DAgYeAQhAWq2nR466PfQ5wvqve449pZ9huGJUkfRvfq5aQ== to show more."
    )
    .trimEnd();
}

function stepByStepGuide(
  templatePath: string,
  extraVars: Record<string, string> = {}
) {
  return function () {
    this.slow(30000);
    this.timeout(60000);
    let vars: {
      registry: string;
      dockerTag: string;
      runTestArgs: string;
      cliTestLocalAlias: string;
      licenseToken: string;
    };

    before(async function () {
      vars = {
        // when executing directly from the yarn/IDE and not through make use make commands to get variables.
        registry:
          process.env.CI_REGISTRY ||
          (await run("make -C ../ get-ci-registry")).trim(),
        dockerTag:
          process.env.DOCKER_TAG ||
          (await run("make -C ../ get-docker-tag")).trim(),
        // when running in test add env vars to disable sentry and datadog
        runTestArgs: `-e PVAULT_LOG_DATADOG_ENABLE=false -e PVAULT_SENTRY_ENABLE=false -e PVAULT_SERVICE_LICENSE=${process.env.PVAULT_SERVICE_LICENSE} `,
        // when running locally use alias to local CLI binary at bin/pvault
        cliTestLocalAlias:
          process.env.IS_CI == "true" ? "" : 'alias pvault="../../bin/pvault"',
        licenseToken: "xxx",
      };

      vars = { ...vars, ...extraVars };

      // Set up cwd dir.
      await run(`mkdir -p ${tempTestExecutionDir}`);
    });
    after(async function () {
      // clean docker container started by the getting started
      await run("docker rm -f pvault-dev");
      await run("docker-compose down || :", {
        cwd: tempTestExecutionDir,
      });
      // Clear up file artifacts.
      await run(`rm -rf ${tempTestExecutionDir}/*`);
    });

    it("works when executed step by step", async function () {
      const script = await parseGuideFile(join(__dirname, templatePath));

      // aggregate all outputs to expected output
      const actualOutput = await script.run(vars, {
        cwd: tempTestExecutionDir,
      });

      // strip dynamic things in the output (timestamps, IDs, table)
      const expectedOutputStripped = replaceDynamicStrings(
        script.aggregatedOutputs(vars)
      );
      const actualOutputStripped = replaceDynamicStrings(actualOutput);

      expect(actualOutputStripped).to.equal(expectedOutputStripped);
    });
  };
}
