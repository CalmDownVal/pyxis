import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { build } from "@calmdown/rolldown-workspace";

await build({
	jail: join(dirname(fileURLToPath(import.meta.url)), "../.."),
});
