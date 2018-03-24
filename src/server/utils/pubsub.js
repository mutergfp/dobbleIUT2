const events = (function(){
    var events = {};

    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    function off(eventName, fn) {
        if (events[eventName])
            events[eventName] = events[eventName].filter(impl => impl !== fn);
    }

    function emit(eventName, data) {
        if (events[eventName])
            events[eventName].forEach(impl => impl(data));
    }

    return { on, off, emit };
})();

module.exports = events;