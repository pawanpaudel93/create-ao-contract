local mod

local status, bint = pcall(require, ".bint")
if status then
    mod = bint
else
    local _, copiedbint = pcall(require, "src.libs.bint.bint")
    mod = copiedbint
end

return mod
