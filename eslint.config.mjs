import { createRequire } from "module";

const require = createRequire(import.meta.url);
const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const nextTypeScript = require("eslint-config-next/typescript");

const eslintConfig = [...nextCoreWebVitals, ...nextTypeScript];

export default eslintConfig;
