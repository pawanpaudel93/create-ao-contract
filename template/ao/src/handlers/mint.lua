local bint = require(".bint")(256)
local utils = require "src.utils.mod"

local mod = {}

function mod.mint(msg)
  assert(type(msg.Quantity) == "string", "Quantity is required!")
  assert(bint(0) < bint(msg.Quantity), "Quantity must be greater than zero!")

  if not Balances[msg.From] then
    Balances[msg.From] = "0"
  end

  if msg.From == ao.id or msg.From == Owner then
    -- Add tokens to the token pool, according to Quantity
    Balances[msg.From] = utils.add(Balances[msg.From], msg.Quantity)
    TotalSupply = utils.add(TotalSupply, msg.Quantity)
    if msg.reply then
      msg.reply({
        Data = "Successfully minted " .. msg.Quantity
      })
    else
      Send({
        Target = msg.From,
        Data = "Successfully minted " .. msg.Quantity
      })
    end
  else
    if msg.reply then
      msg.reply({
        Action = "Mint-Error",
        ["Message-Id"] = msg.Id,
        Error = "Only the Process Id can mint new " .. Ticker .. " tokens!"
      })
    else
      Send({
        Target = msg.From,
        Action = "Mint-Error",
        ["Message-Id"] = msg.Id,
        Error = "Only the Process Id can mint new " .. Ticker .. " tokens!"
      })
    end
  end
end

return mod
