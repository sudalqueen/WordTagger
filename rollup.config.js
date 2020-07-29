import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const external = id => !id.startsWith("/") && !id.startsWith(".");

export default {
    input: "./src/component/TagEditor.jsx",
    output: {
        file: pkg.main,  
        format: "cjs",   
    },
    plugins: [
        babel({ runtimeHelpers: true }),
    ],
    external,
};