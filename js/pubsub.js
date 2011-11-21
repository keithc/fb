/*! sf-pubsub */
(function (a) {
    var b = {};
    a.publish = function (f, e) {
        if (b[f]) {
        	var h = b[f].slice(0), 
                c = e || [];
            if (!a.isArray(c)) {
                c = [c]
            }
            // slice is used to copy the array to deal with case where a method calls unsubscribe.
            for (var g = 0, d = h.length; g < d; g++) {
                h[g].apply(a, c)
            }
        }
    };
    a.subscribe = function (c, d) {
        if (!b[c]) {
            b[c] = []
        }
        b[c].push(d);
        return {
            topic: c,
            callback: d
        }
    };
    a.unsubscribe = function (f) {
        var d = f.topic;
        if (b[d]) {
            var g = b[d];
            for (var e = 0, c = g.length; e < c; e++) {
                if (g[e] === f.callback) {
                    g.splice(e, 1)
                }
            }
        }
    }
})(jQuery);