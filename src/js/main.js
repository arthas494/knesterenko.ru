'use strict'

bokeh.show();

//--------------------------------------------------------
document.querySelector('#btnSend').
addEventListener('click', function() {
    var msg = document.querySelector('#msgSend');
    msg.innerHTML = '';
    var text = document.querySelector('#text').value;
    if (text.replace(/\s/g, "").length == 0) {
        msg.innerHTML = 'Введите сообщение';
        return;
    }

    var email = document.querySelector('#email').value;
    if (email.replace(/\s/g, "").length == 0) {
        msg.innerHTML = 'Введите email';
        return;
    }

    var name = document.querySelector('#name').value;
    requestText = 'name=' + name + '&email=' + email + '&text=' + text;

    ajax.POST('../mail.php', requestText, function() {
        msg.innerHTML = 'Сообщение отправлено';
    })

});

//--------------------------------------------------------
document.querySelector('.next'). //right arrow
addEventListener('click', function() {
    pages.next();
});

document.querySelector('.prev'). //left arrow
addEventListener('click', function() {
    pages.prev();
});

function pageToggle(nextPage) {
    pages._menuButton.classList.remove('open');
    pages._menu.classList.remove('open');
    pages._lockScreen.classList.remove('open');
    if (nextPage != undefined) pages.goto(nextPage);
}

document.querySelector('.menu-btn').
addEventListener('click', function() {
    pages._menuButton.classList.toggle('open');
    pages._menu.classList.toggle('open');
    pages._lockScreen.classList.toggle('open');
});

document.querySelector('.lock-screen').
addEventListener('click', function(e) {
    pageToggle();
});

document.querySelector('.menu__main').addEventListener('click', function() {
    pageToggle(0);
});

document.querySelector('.menu__porfolio').addEventListener('click', function() {
    pageToggle(1);
});

document.querySelector('.menu__contacts').addEventListener('click', function() {
    pageToggle(2);
});

document.querySelector('.menu__reviews').addEventListener('click', function() {
    pageToggle(3);
});


//----------------------------------------------------------
var pages = {
    _bg: document.querySelector('.background'), //background
    _prev: document.querySelector('.prev'),
    _next: document.querySelector('.next'),
    _menuButton: document.querySelector('.menu-btn'),
    _menu: document.querySelector('.menu'),
    _lockScreen: document.querySelector('.lock-screen'),
    _pages: [].slice.call(document.querySelectorAll('.pages > .page')), //array of pages
    _curIndex: 0, //current page
    _seqIndex: 1, //sequent page (next or previous)
    _animate: false,
    //--------------------------------------------------------
    set curIndex(value) {
        this._curIndex = value
    },
    get curIndex() {
        return this._curIndex
    },
    get nextIndex() {
        return this.curIndex < this._pages.length - 1 ? this.curIndex + 1 : this.curIndex
    },
    get prevIndex() {
        return this.curIndex > 0 ? this.curIndex - 1 : this.curIndex
    },
    set seqIndex(value) {
        this._seqIndex = value
    },
    get seqIndex() {
        return this._seqIndex
    },
    get curPage() {
        return this._pages[this.curIndex]
    },
    get seqPage() {
        return this._pages[this.seqIndex]
    },
    get pagesLength() {
        return this._pages.length
    },
    set animate(value) {
        this._animate = value
    },
    get animate() {
        return this._animate
    },
    //--------------------------------------------------------
    setEventListeners: function() {
        var self = this;
        for (var i = 0; i < this.pagesLength; i++) {
            this._pages[i].addEventListener('animationend', function(e) {
                if (e.animationName === 'blur-in-animation') {
                    self.curPage.classList.remove('page--current');
                    self.curPage.classList.remove('blur-in');
                    self.curIndex = self.seqIndex;
                    self.seqPage.classList.add('page--current');
                    self.seqPage.classList.add('blur-out');
                    self._bg.classList.add('blur-in-bg');
                    self._bg.classList.remove('blur-out-bg');
                    window.scrollTo(0, 0);
                } else {
                    self.seqPage.classList.remove('blur-out');
                    self._animate = false;
                    self.btnsEnable();
                };
            }, false);
        }
    },
    //--------------------------------------------------------
    changeBreak: function() {
        if (this.animate || this.seqIndex === this.curIndex)
            return true;
        else
            return false;
    },
    //--------------------------------------------------------
    btnsEnable: function() {
        if (this.curIndex != 0) this._prev.style.visibility = "visible";
        if (this.curIndex != this.pagesLength - 1) this._next.style.visibility = "visible";
    },
    //--------------------------------------------------------
    btnsDisable: function() {
        this._prev.style.visibility = "hidden";
        this._next.style.visibility = "hidden";
    },
    //--------------------------------------------------------
    changePage: function() {
        if (this.changeBreak()) return;
        this.animate = true;
        this.btnsDisable();
        this.curPage.classList.add('blur-in');
        this._bg.classList.add('blur-out-bg');
    },
    //--------------------------------------------------------
    next: function() {
        this.seqIndex = this.nextIndex;
        this.changePage();
    },
    //--------------------------------------------------------        
    prev: function() {
        this.seqIndex = this.prevIndex;
        this.changePage();
    },
    //--------------------------------------------------------        
    goto: function(index) {
        this.seqIndex = index;
        this.changePage();
    }
}

pages.setEventListeners();