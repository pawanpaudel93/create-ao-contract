local mod

local status, json = pcall(require, "json")
if status then
    mod = json
else
    local _, copiedjson = pcall(require, "src.libs.json.json")
    mod = copiedjson
end

return mod
