import { defineConfig } from "ao-deploy";

export default defineConfig({
  my_ao_contract: {
    name: "my-ao-contract",
    contractPath: "src/contract.lua",
    luaPath: "./src/?.lua",
  },
});
