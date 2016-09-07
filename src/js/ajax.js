var ajax = (function() {
    return {
        //----------------------------------------------------------
        GET: function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log('GET error: ' + xhr.status + ': ' + xhr.statusText);
                } else {
                    callback.call(xhr.responseText);
                }
            }
        },
        //----------------------------------------------------------
        POST: function(url, requestText, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(requestText);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState != 4) return;
                    if (xhr.status != 200) {
                        console.log('POST error: ' + xhr.status + ': ' + xhr.statusText);
                    } else {
                        callback.call(xhr.responseText);
                    }
                }
            }
            //----------------------------------------------------------
    }
}());