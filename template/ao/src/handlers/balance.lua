local json = require "json"

local mod = {}

-- Get target balance
---@type HandlerFunction
function mod.balance(msg)
  local bal = "0"

  -- If not Recipient is provided, then return the Senders balance
  if (msg.Tags.Recipient) then
    if (Balances[msg.Tags.Recipient]) then
      bal = Balances[msg.Tags.Recipient]
    end
  elseif msg.Tags.Target and Balances[msg.Tags.Target] then
    bal = Balances[msg.Tags.Target]
  elseif Balances[msg.From] then
    bal = Balances[msg.From]
  end
  if msg.reply then
    msg.reply({
      Balance = bal,
      Ticker = Ticker,
      Account = msg.Tags.Recipient or msg.From,
      Data = bal
    })
  else
    Send({
      Target = msg.From,
      Balance = bal,
      Ticker = Ticker,
      Account = msg.Tags.Recipient or msg.From,
      Data = bal
    })
  end
end

-- Get balances
---@type HandlerFunction
function mod.balances(msg)
  if msg.reply then
    msg.reply({
      Data = json.encode(Balances)
    })
  else
    Send({
      Target = msg.From,
      Data = json.encode(Balances)
    })
  end
end

return mod
