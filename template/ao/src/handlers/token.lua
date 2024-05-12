local mod = {}

Balances = Balances or {}
Name = Name or ao.env.Process.Tags.Name
Ticker = Ticker or ao.env.Process.Tags.Ticker
Denomination = Denomination or tonumber(ao.env.Process.Tags.Denomination)
Logo = Logo or ao.env.Process.Tags.Logo

-- Get contract info
---@type HandlerFunction
function mod.info(msg)
    ao.send({
        Target = msg.From,
        Name = Name,
        Ticker = Ticker,
        Logo = Logo,
        Denomination = tostring(Denomination)
    })
end

return mod
