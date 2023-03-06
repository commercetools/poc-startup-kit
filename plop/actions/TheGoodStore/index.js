const { spawn } = require('child_process');

export default function getTheGoodStoreAction(_, config) {
	const spawnOptions = config.verbose ? {
		cwd: config.path,
		shell: true,
		stdio: 'inherit',
	} : {
		cwd: config.path
	};


	const gitApply = () =>
		new Promise((resolve, reject) => {
			const gitAdd = spawn('git', ['apply', '/patches/good-store.patch'], spawnOptions);

			gitAdd.on('close', (code) => {
				if (didSucceed(code)) {
					resolve(`git commit ran correctly`);
				} else {
					reject(`git add exited with ${code}`);
				}
			});
		});

	return gitApply();
}