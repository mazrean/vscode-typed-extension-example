import fs from "fs";
import packageJson from "../package.json" with { type: "json" };

fs.writeFileSync(
  "src/package.json.gen.ts",
  `/**
* @generated
*/

export default ${JSON.stringify(packageJson, null, 2)} as const;
`
);
