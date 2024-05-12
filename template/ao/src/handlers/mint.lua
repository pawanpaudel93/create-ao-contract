local bint = require "src.libs.bint.mod" (256)
local mod = {}

function mod.mint(msg)
    assert(type(msg.Quantity) == 'string', 'Quantity is required!')
    assert(bint.__lt(0, msg.Quantity), 'Quantity must be greater than zero!')

    if not Balances[ao.id] then Balances[ao.id] = "0" end

    if msg.From == ao.id then
        -- Add tokens to the token pool, according to Quantity
        Balances[msg.From] = tostring(bint.__add(Balances[Owner], msg.Quantity))
        ao.send({
            Target = msg.From,
            Data = "Successfully minted " .. msg.Quantity
        })
    else
        ao.send({
            Target = msg.From,
            Action = 'Mint-Error',
            ['Message-Id'] = msg.Id,
            Error = 'Only the Process Owner can mint new ' .. Ticker .. ' tokens!'
        })
    end
end

return mod
