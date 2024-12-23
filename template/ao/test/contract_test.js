/* eslint-disable no-undef */
import assert from "assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { describe, it, beforeEach } from "node:test";
import { AO, acc } from "wao/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getContractSrcData() {
  const contractPath = path.join(__dirname, "..", "dist", "my-ao-contract.lua");
  const contract = fs.readFileSync(contractPath, "utf8");
  return contract;
}

console.log("\n\nRunning js tests...\n");

describe("Token", function () {
  let ao;
  let p;
  let pid;
  let sender;

  // Setup before each test
  beforeEach(async () => {
    sender = acc[0];
    ao = await new AO().init(sender);
    const src = getContractSrcData();
    const result = await ao.deploy({
      tags: { Name: "Points Coin" },
      loads: [src, "Name = 'Points Coin'"],
    });
    p = result.p;
    pid = result.pid;
  });

  it("should return correct token info", async () => {
    const out = await p.d("Info", {
      get: {
        Name: "Name",
        Logo: "Logo",
        Ticker: "Ticker",
        Denomination: "Denomination",
      },
    });
    assert.deepEqual(out, {
      Name: "Points Coin",
      Ticker: "PNTS",
      Logo: "SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ-KY",
      Denomination: "12",
    });
  });

  it("should return total supply", async () => {
    const out = await p.d("Total-Supply");
    assert.equal(out, (10000 * 10 ** 12).toString());
  });

  it("should return balance", async () => {
    const out = await p.d("Balance", { Target: pid });
    assert.equal(out, (10000 * 10 ** 12).toString());
  });

  it("should return all balances", async () => {
    const out = await p.d("Balances");
    assert.deepEqual(out, { [pid]: (10000 * 10 ** 12).toString() });
  });

  it("should perform transfer", async () => {
    const recipient = acc[1].addr;
    const quantity = "5000000000000000"; // 5000 * 10^12 (denomination)

    await p.m(
      "Mint",
      { Quantity: quantity },
      {
        check: `Successfully minted ${quantity}`,
      }
    );

    await p.m(
      "Transfer",
      {
        Recipient: recipient,
        Quantity: quantity,
      },
      {
        check: { Action: "Debit-Notice" },
      }
    );
  });

  it("should not perform transfer", async () => {
    const recipient = acc[1].addr;
    const quantity = "5000000000000000"; // 5000 * 10^12 (denomination)

    await p.msg(
      "Transfer",
      {
        Recipient: recipient,
        Quantity: quantity,
      },
      {
        check: { Action: "Transfer-Error" },
      }
    );
  });

  it("should perform mint", async () => {
    const quantity = "5000000000000000"; // 5000 * 10^12 (denomination)
    await p.m("Mint", { Quantity: quantity }, { check: `Successfully minted ${quantity}` });
    const out = await p.d("Balance");
    assert.equal(out, quantity);
  });

  it("should perform burn", async () => {
    const quantity = "5000000000000000"; // 5000 * 10^12 (denomination)
    await p.m("Mint", { Quantity: quantity }, { check: `Successfully minted ${quantity}` });
    await p.m("Burn", { Quantity: quantity }, { check: `Successfully burned ${quantity}` });
    const out = await p.d("Balance");
    assert.equal(out, "0");
  });
});
