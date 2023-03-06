import { spawn } from "child_process";
const didSucceed = (code) => `${code}` === '0';

export default function getTheGoodStoreAction(_, config) {
  const spawnOptions = config.verbose
    ? {
        cwd: config.path,
        shell: true,
        stdio: "inherit",
      }
    : {
        cwd: config.path,
      };

  const gitApply = () =>
    new Promise((resolve, reject) => {
      const gitAdd = spawn(
        "git",
        ["apply", "plop/patches/good-store.patch --reject"],
        spawnOptions
      );

      gitAdd.on("close", (code) => {
        if (didSucceed(code)) {
          resolve(`git commit ran correctly`);
        } else {
          reject(`git add exited with ${code}`);
        }
      });
    });

  return gitApply();
}
