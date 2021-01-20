// eslint-disable-file @typescript-eslint/no-var-requires
const obfuscatingTransformer = require("@quinaryio/react-native-obfuscating-transformer");
const typescriptTransformer = require("react-native-typescript-transformer");
const svgTransformer = require("react-native-svg-transformer");

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith(".svg")) {
    return svgTransformer.transform({ src, filename, options });
  } else {
    return obfuscatingTransformer({
      upstreamTransformer: typescriptTransformer,
      filter: (file) => file.startsWith("src") || file === "index.ts",
      enableInDevelopment: false,
      obfuscatorOptions: {
        compact: true,
        controlFlowFlattening: true, //false
        controlFlowFlatteningThreshold: 0.75, //0
        deadCodeInjection: false, //false
        deadCodeInjectionThreshold: 0.4, //0
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: "hexadecimal",
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: false,
        shuffleStringArray: true,
        splitStrings: true, //false
        splitStringsChunkLength: 5, //0
        stringArray: true,
        stringArrayEncoding: "rc4", //false
        stringArrayThreshold: 1,
        transformObjectKeys: true, //false
        unicodeEscapeSequence: false,
        target: "node",
        sourceMapMode: "separate",
      },
      trace: true,
    }).transform({ src, filename, options });
  }
};
