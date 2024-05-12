import { defineConfig } from "ao-deploy";

export default defineConfig({
  my_ao_contract: {
    name: "my-ao-contract",
    contractPath: "src/contract.lua",
    luaPath: "./src/?.lua",
    tags: [
      { name: "Name", value: "Points Coin" },
      { name: "Points", value: "Points Coin" },
      { name: "Ticker", value: "PNTS" },
      { name: "Denomination", value: "12" },
      { name: "Logo", value: "SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ" },
    ],
  },
});
