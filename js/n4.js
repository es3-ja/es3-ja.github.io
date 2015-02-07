with (document.tags) {
    h1.position =
        h2.position =
            h3.position =
                h4.position =
                    h5.position =
                        h6.position = 'relative';
}
window.onload = setTimeout(function () {

    function getFragmentId(o) {
        return ( o.hash.length <= 1 ) ? '' : o.hash.substring(1, o.hash.length);
    }

    function scrollToLayer(o) {
        var id = (typeof o == 'object') ?
                 getFragmentId(o.target) : String(o);
        if (lays[id]) {
            if (location.hash != '#' + id) {
                location.hash = id;
            }
            window.scrollTo(0, lays[id].pageY);
            return false;
        }
    }

    var lays = new Object;

    function layerEnum(layers) {
        for (var i = 0; i < layers.length; i++) {
            lays[layers[i].id] = layers[i];
            layerEnum(layers[i].document.layers);
        }
    }

    (document.layers, 1);

    var links = document.links;
    if (location.hash) {
        scrollToLayer(getFragmentId(location));
    }
    for (var i = 0; i < links.length; i++) {
        if (links[i].hash && links[i].pathname == location.pathname) {
            links[i].onclick = scrollToLayer;
        }
    }
}, 500);