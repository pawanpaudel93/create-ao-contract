local bint = require('.bint')(256)
local utils = require "src.utils.mod"

local mod = {}

function mod.burn(msg)
    assert(type(msg.Quantity) == 'string', 'Quantity is required!')
    assert(bint(msg.Quantity) <= bint(Balances[msg.From]), 'Quantity must be less than or equal to the current balance!')

    Balances[msg.From] = utils.subtract(Balances[msg.From], msg.Quantity)
    TotalSupply = utils.subtract(TotalSupply, msg.Quantity)

    ao.send({
        Target = msg.From,
        Data = "Successfully burned " .. msg.Quantity
    })
end

return mod
