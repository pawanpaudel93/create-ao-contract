local testing = require "arweave.testing"
local bint = require "src.libs.bint.mod"
local json = require "src.libs.json.mod"
local assertions = require "tests.assertions"

require "src.libs.ao.mod"

-- Token globals
_G.Name = "Test Token"
_G.Ticker = "TTKN"
_G.Denomination = 12
_G.Balances = {}
_G.Logo = ""

ao.id = testing.utils.generateAddress()
ao = mock(ao)

describe("Token", function()
    before_each(function()
        -- reset mocks
        ao.send:clear()
    end)

    test("Info", function()
        local msg = {
            From = testing.utils.generateAddress()
        }

        Handlers.__handlers_added["Info"](msg)

        local expectedOutput = {
            Target = msg.From,
            Tags = {
                Name = Name,
                Ticker = Ticker,
                Denomination = Denomination,
                Logo = Logo
            }
        }

        assert.spy(ao.send).was.called_with(expectedOutput)
    end)
end)
