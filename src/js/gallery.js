(function photo() {
    //--------------------------------------------------------
    document.querySelector('.card__wedding__img').
    addEventListener('click', function() {
        photo.open('wedding');
    });
    //--------------------------------------------------------
    document.querySelector('.card__lovestory__img').
    addEventListener('click', function() {
        photo.open('lovestory');
    });
    //--------------------------------------------------------
    document.querySelector('.card__photosession__img').
    addEventListener('click', function() {
        photo.open('photosession');
    });
    //--------------------------------------------------------
    document.querySelector('.card__portrait__img').
    addEventListener('click', function() {
        photo.open('portrait');
    });
    //--------------------------------------------------------
    document.querySelector('.card__children__img').
    addEventListener('click', function() {
        photo.open('children');
    });

    //--------------------------------------------------------
    var photo = {
        _items: { //arrays of picture file lists 
            wedding: [],
            lovestory: [],
            photosession: [],
            portrait: [],
            children: []
        },

        fillItems: function() {
            for (var key in this._items) {
                this.getPhotoArray(key, this._items[key])
            }
        },

        getPhotoArray: function(folder) {
            ajax.GET('../get_photos.php?folder=' + folder, function() {
                photo._items[folder] = JSON.parse(this);
            });
        },

        open: function(photoType) {
            var pswpElement = document.querySelectorAll('.pswp')[0];
            var options = {
                index: 0
            };
            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this._items[photoType], options);
            gallery.init();
        }
    }

    photo.fillItems();

})();