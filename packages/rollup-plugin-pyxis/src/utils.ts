import * as path from "node:path";

export function getShortModuleId(root: string, moduleId: string) {
	const relative = path.relative(root, moduleId).replace(/\\/g, "/");
	return path.posix.normalize(relative);
}

export function isPathWithin(root: string, moduleId: string) {
	const relative = path.relative(root, moduleId);
	return (
		relative &&
		!relative.startsWith("..") &&
		!path.isAbsolute(relative)
	);
}

export function getPackageChecker(name: string) {
	const dir = name.replace(/\//g, "_");
	return (source: string) => {
		let i;
		return (
			// exact match or sub-import
			source === name ||
			source.startsWith(`${name}/`) ||

			// also check resolved paths
			((i = source.indexOf(`/${dir}`)) !== -1 && /[\/._]/.test(source[i + dir.length + 1]))
		);
	};
}
