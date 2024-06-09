local mod = {}

--- @type Balances
Balances = Balances or {}
--- @type Name
Name = Name or ao.env.Process.Tags.Name
--- @type Ticker
Ticker = Ticker or ao.env.Process.Tags.Ticker
--- @type Denomination
Denomination = Denomination or tonumber(ao.env.Process.Tags.Denomination)
--- @type Logo
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
