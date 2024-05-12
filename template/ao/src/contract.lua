local token = require "src.handlers.token"
local balance = require "src.handlers.balance"
local transfer = require "src.handlers.transfer"
local mint = require "src.handlers.mint"

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

--[[
    Info
  ]]
--
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), token.info)

--[[
    Balance
  ]]
--
Handlers.add('balance', Handlers.utils.hasMatchingTag('Action', 'Balance'), balance.balance)

--[[
    Balances
  ]]
--
Handlers.add('balances', Handlers.utils.hasMatchingTag('Action', 'Balances'), balance.balances)

--[[
    Transfer
  ]]
--
Handlers.add('transfer', Handlers.utils.hasMatchingTag('Action', 'Transfer'), transfer.transfer)

--[[
    Mint
  ]]
--
Handlers.add('mint', Handlers.utils.hasMatchingTag('Action', 'Mint'), mint.mint)
