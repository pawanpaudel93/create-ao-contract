local testing = require "arweave.testing"
local json = require "src.libs.json.mod"
local utils = require "src.utils.mod"

require "src.libs.ao.mod"
require "src.contract"

ao = mock(ao)

-- Token globals
_G.Name = "Test Token"
_G.Ticker = "TTKN"
_G.Denomination = 12
_G.Balances = { [ao.id] = utils.toBalanceValue(10000 * 10 ^ Denomination) }
TotalSupply = TotalSupply or utils.toBalanceValue(10000 * 10 ^ Denomination)
_G.Logo = "SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ-KY"

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
            Name = Name,
            Ticker = Ticker,
            Denomination = tostring(Denomination),
            Logo = Logo
        }

        assert.spy(ao.send).was.called_with(expectedOutput)
    end)

    test("Total Supply", function()
        local msg = {
            From = testing.utils.generateAddress()
        }

        Handlers.__handlers_added["Total-Supply"](msg)

        local expectedOutput = {
            Target = msg.From,
            Action = 'Total-Supply',
            Data = TotalSupply,
            Ticker = Ticker,
        }

        assert.spy(ao.send).was.called_with(expectedOutput)
    end)

    test("Balance", function()
        local msg = {
            From = testing.utils.generateAddress(),
            Tags = {
                Target = ao.id
            }
        }

        Handlers.__handlers_added["Balance"](msg)

        local expectedOutput = {
            Target = msg.From,
            Balance = Balances[ao.id],
            Ticker = Ticker,
            Account = msg.From,
            Data = Balances[ao.id]
        }

        assert.spy(ao.send).was.called_with(expectedOutput)
    end)

    test("Balances", function()
        local msg = {
            From = testing.utils.generateAddress(),
        }

        Handlers.__handlers_added["Balances"](msg)

        local expectedOutput = {
            Target = msg.From,
            Data = json.encode(Balances)
        }

        assert.spy(ao.send).was.called_with(expectedOutput)
    end)

    test("Transfer", function()
        local msg = {
            From = ao.id,
            Recipient = testing.utils.generateAddress(),
            Quantity = utils.toBalanceValue(5000 * 10 ^ Denomination)
        }

        Handlers.__handlers_added["Transfer"](msg)

        local expectedCreditNotice = {
            Target = msg.Recipient,
            Action = 'Credit-Notice',
            Sender = msg.From,
            Quantity = msg.Quantity,
            Data = "You received " .. msg.Quantity .. " from " .. msg.From
        }

        local expectedDebitNotice = {
            Target = msg.From,
            Action = 'Debit-Notice',
            Recipient = msg.Recipient,
            Quantity = msg.Quantity,
            Data = "You transferred " .. msg.Quantity .. " to " .. msg.Recipient
        }

        assert.spy(ao.send).was.called_with(expectedCreditNotice)
        assert.spy(ao.send).was.called_with(expectedDebitNotice)
    end)

    test("Mint", function()
        local msg = {
            From = ao.id,
            Quantity = utils.toBalanceValue(5000 * 10 ^ Denomination)
        }

        local prevBalance = Balances[msg.From] or "0"

        Handlers.__handlers_added["Mint"](msg)

        local expectedOutput = {
            Target = msg.From,
            Data = "Successfully minted " .. msg.Quantity
        }

        assert(Balances[ao.id] == utils.add(prevBalance, msg.Quantity), "Balance mismatch!")
        assert.spy(ao.send).was.called_with(expectedOutput)
    end)

    test("Burn", function()
        local msg = {
            From = ao.id,
            Quantity = utils.toBalanceValue(5000 * 10 ^ Denomination)
        }

        local prevBalance = Balances[msg.From] or "0"

        Handlers.__handlers_added["Burn"](msg)

        local expectedOutput = {
            Target = msg.From,
            Data = "Successfully burned " .. msg.Quantity
        }

        assert(Balances[ao.id] == utils.subtract(prevBalance, msg.Quantity), "Balance mismatch!")
        assert.spy(ao.send).was.called_with(expectedOutput)
    end)
end)
