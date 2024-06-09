local mod = {}

local function match_error(actual, expected)
    if not actual or not expected then
        assert(actual == expected, "Expected error did not match actual:\n\n  Actual:     nil" .. "\n  Expected:   nil",
            2)
        return
    end

    local errMsg = string.match(actual, expected)

    assert(actual == errMsg,
        "Expected error did not match actual:\n\n  Actual:     " .. actual .. "\n  Expected:   " .. expected, 2)
end

function mod.assert_error(err)
    return {
        is = function(expected)
            return match_error(err, expected)
        end
    }
end

return mod
