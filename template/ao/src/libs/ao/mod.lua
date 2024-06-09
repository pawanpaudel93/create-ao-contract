---Create a fake `Handlers` variable that `ao` would use in the real code.
_G.Handlers = {
    ---A storage variable to hold handlers that are added via `Handlers.add()` in
    ---the real code. The `Handlers.add()` function is rewritten below, so the
    ---handler that is added by the real code gets stored here. With this setup,
    ---tests can call `Handlers.get("name_of_handler")(msg, env)` to execute the
    ---handler they want to test.
    __handlers_added = {},

    ---Get a handler that was added by the code being tested.
    ---@param name string The name of the handler. The name is the `name` argument
    ---passed to `Handlers.add()`.
    ---@return HandlerFunction
    get = function(name)
        return Handlers.__handlers_added[name]
    end,

    ---A rewrite of the original implementation so handlers can be stored in this
    ---fake global `Handlers` variable.
    add = function(name, condition, func)
        Handlers.__handlers_added[name] = func
    end,

    ---A stub of the original implementation. These tests do not care about
    ---executing this condition. They just need it to exist so `nil` errors do not
    ---show up.
    utils = {
        hasMatchingTag = function(name, value)
            return true
        end
    }
}

_G.ao = {
    id = nil,
    send = function(args)
        return args
    end,

    log = function(args)
        return args
    end
}
