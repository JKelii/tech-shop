import type { CodegenConfig } from "@graphql-codegen/cli";

const config = {
  overwrite: true,
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clyd7qisg06s507w9nl58tu42/master",
  documents: "src/lib/graphql/**/*.graphql",
  generates: {
    "src/lib/hygraph/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
        dedupeFragments: true,
      },
      config: {
        useTypeImports: true,
        defaultScalarType: "unknown",
        skipTypename: true,
        documentMode: "string",
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        scalars: {
          _Any: "unknown",
          Date: "string",
          DateTime: "string",
          Decimal: "number",
          JSON: "unknown",
          JSONString: "string",
          PositiveDecimal: "number",
        },
      },
    },
  },
} satisfies CodegenConfig;

export default config;
