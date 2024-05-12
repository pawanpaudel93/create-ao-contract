local json = require "src.libs.json.mod"

local mod = {}


-- Get target balance
---@type HandlerFunction
function mod.balance(msg)
    local bal = '0'

    -- If not Target is provided, then return the Senders balance
    if (msg.Tags.Target and Balances[msg.Tags.Target]) then
        bal = Balances[msg.Tags.Target]
    elseif Balances[msg.From] then
        bal = Balances[msg.From]
    end

    ao.send({
        Target = msg.From,
        Balance = bal,
        Ticker = Ticker,
        Account = msg.Tags.Target or msg.From,
        Data = bal
    })
end

-- Get balances
---@type HandlerFunction
function mod.balances(msg)
    ao.send({ Target = msg.From, Data = json.encode(Balances) })
end

return mod
