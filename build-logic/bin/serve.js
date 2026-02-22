import { EOL } from "node:os";
import * as path from "node:path";

import { buildCommand, Builder, Dispatcher, Env, NoOpReporter, parseArgs, Workspace } from "@calmdown/rolldown-workspace";
import pyxis from "@calmdown/rollup-plugin-pyxis";
import { createServer } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ServeCommand = buildCommand()
	.opt("debug", { flag: "d" })
	.opt("port", {
		flag: "p",
		default: 8080,
		read: opt => {
			const port = Number(opt);
			if (!Number.isInteger(port)) {
				throw new Error("--port must be an integer");
			}

			return port;
		},
	})
	.build();

try {
	const cmd = parseArgs(ServeCommand);

	// discover workspace
	const jail = path.join(import.meta.dirname, "../..");
	const { currentPackage } = await Workspace.discover({ jail });
	if (!currentPackage) {
		throw new Error("no package found");
	}

	console.log(`${EOL}starting dev server for ${currentPackage.declaration.name}${EOL}`);

	// get the serve/build target
	const call = {
		reporter: NoOpReporter,
		env: Env.Development,
		isDebug: cmd.opts.debug,
		isWatching: true,
	};

	const targets = await Builder.getTargets(currentPackage, call);
	if (targets.length !== 1) {
		throw new Error(`expected a single build target but got ${targets.length}`);
	}

	// run dispatcher to watch and build dependencies
	const activity = await Dispatcher.run(currentPackage.downstreamDependencies, call);

	// start Vite server
	process.chdir(currentPackage.directory);

	const target = targets[0];
	const server = await createServer({
		configFile: false,
		cacheDir: path.join(currentPackage.directory, "./.vite"),
		root: currentPackage.directory,
		server: {
			host: "0.0.0.0",
			port: cmd.opts.port,
			hmr: true,
		},
		build: {
			outDir: "./dist",
			target: "esnext",
			sourcemap: true,
			rolldownOptions: {
				...target.input,
				output: target.outputs,
			},
		},
		plugins: [
			tsconfigPaths(),
			pyxis({
				cssModules: true,
				hmr: true,
			}),
		],
	});

	await server.listen();

	server.printUrls();
	server.bindCLIShortcuts({ print: true });

	await activity.completed;

	console.log(`${EOL}shutting down...${EOL}`);
	await server.close();
	process.exitCode = 0;
}
catch (ex) {
	console.error(ex);
	process.exitCode = 1;
}
