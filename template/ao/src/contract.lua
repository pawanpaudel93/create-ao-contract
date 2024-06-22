local token = require "src.handlers.token"
local balance = require "src.handlers.balance"
local transfer = require "src.handlers.transfer"
local mint = require "src.handlers.mint"
local burn = require "src.handlers.burn"

--[[
  This module implements the ao Standard Token Specification.

  Terms:
    Sender: the wallet or Process that sent the Message

  It will first initialize the internal state, and then attach handlers,
    according to the ao Standard Token Spec API:

    - Info(): return the token parameters, like Name, Ticker, Logo, and Denomination

    - Balance(Target?: string): return the token balance of the Target. If Target is not provided, the Sender
        is assumed to be the Target

    - Balances(): return the token balance of all participants

    - Transfer(Target: string, Quantity: number): if the Sender has a sufficient balance, send the specified Quantity
        to the Target. It will also issue a Credit-Notice to the Target and a Debit-Notice to the Sender

    - Mint(Quantity: number): if the Sender matches the Process Owner, then mint the desired Quantity of tokens, adding
        them the Processes' balance
]]
--

-- Info
Handlers.add('Info', Handlers.utils.hasMatchingTag('Action', 'Info'), token.info)

-- Total Supply
Handlers.add('Total-Supply', Handlers.utils.hasMatchingTag('Action', "Total-Supply"), token.totalSupply)

-- Balance
Handlers.add('Balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), balance.balance)

-- Balances
Handlers.add('Balances', Handlers.utils.hasMatchingTag('Action', 'Balances'), balance.balances)

-- Transfer
Handlers.add('Transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), transfer.transfer)

-- Mint
Handlers.add('Mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), mint.mint)

-- Burn
Handlers.add('Burn', Handlers.utils.hasMatchingTag('Action', 'Burn'), burn.burn)
