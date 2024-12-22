local utils = require "src.utils.mod"

local mod = {}

--- @type Denomination
Denomination = Denomination or 12
--- @type Balances
Balances = Balances or {
  [ao.id] = utils.toBalanceValue(10000 * 10 ^ Denomination)
}
--- @type TotalSupply
TotalSupply = TotalSupply or utils.toBalanceValue(10000 * 10 ^ Denomination)
--- @type Name
Name = Name or "Points Coin"
--- @type Ticker
Ticker = Ticker or "PNTS"
--- @type Logo
Logo = Logo or "SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ-KY"

-- Get token info
---@type HandlerFunction
function mod.info(msg)
  if msg.reply then
    msg.reply({
      Name = Name,
      Ticker = Ticker,
      Logo = Logo,
      Denomination = tostring(Denomination)
    })
  else
    Send({
      Target = msg.From,
      Name = Name,
      Ticker = Ticker,
      Logo = Logo,
      Denomination = tostring(Denomination)
    })
  end
end

-- Get token total supply
---@type HandlerFunction
function mod.totalSupply(msg)
  assert(msg.From ~= ao.id, "Cannot call Total-Supply from the same process!")
  if msg.reply then
    msg.reply({
      Action = "Total-Supply",
      Data = TotalSupply,
      Ticker = Ticker
    })
  else
    Send({
      Target = msg.From,
      Action = "Total-Supply",
      Data = TotalSupply,
      Ticker = Ticker
    })
  end
end

return mod
