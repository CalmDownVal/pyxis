import * as path from "node:path";

import { build } from "@calmdown/rolldown-workspace";

const jail = path.join(import.meta.dirname, "../..");
await build({ jail });
