const container = document.getElementById('container');
var start = 0;
var b = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
var p = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
var random = new Array();
var press = 38;
var movement = 100;
var gameOver = 0;
var rst = 0;

randomNumber = (movement, press) => {
    var nextRandom = new Array();
    var space = 0;
    for (let i = 0; i < 16; i++) {
        let divCreat = document.querySelector(`#container > div:nth-child(${i + 1})`);
        divCreat.innerText = b[i];
        if (b[i] === 0) {
            if (press === 40 && (i === 12 || i === 13 || i === 14 || i === 15)) {
                divCreat.style.color = 'transparent';
            } else if (press === 38 && (i === 0 || i === 1 || i === 2 || i === 3)) {
                divCreat.style.color = 'transparent';
            } else if (press === 39 && (i === 3 || i === 7 || i === 11 || i === 15)) {
                divCreat.style.color = 'transparent';
            } else if (press === 37 && (i === 0 || i === 4 || i === 8 || i === 12)) {
                divCreat.style.color = 'transparent';
            }
            else {
                nextRandom.push(i);
                divCreat.style.color = 'transparent';
            }
        } else {
            divCreat.style.color = 'black';
        }
    }

    if (movement != 0 || (movement === 0 && start === 1)) {
        let numbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
        var r = Math.floor(Math.random() * nextRandom.length);
        b[nextRandom[r]] = numbers[Math.floor(Math.random() * numbers.length)];
        start++;
    }

    for (let n = 0; n < 16; n++) {
        if (b[n] === 0) {
            space++;
        }
    }

    if (space === 0) {
        for (let r = 0; r < 16; r++) {
            if (r === 1 || r === 3 || r === 12 || r === 15) {
                continue;
            }
            if (r === 4 || r === 7 || r === 8 || r === 11) {
                if (b[r + 4] != b[r] && b[r - 4] != b[r]) {
                    gameOver++;
                }
            } else if (r === 2 || r === 3 || r === 13 || r === 14) {
                if (b[r + 1] != b[r] && b[r - 1] != b[r]) {
                    gameOver++;
                }
            } else {
                if (((b[r + 1] != b[r]) && (b[r - 1] != b[r]) && (b[r + 4] != b[r]) && (b[r - 4] != b[r]))) {
                    gameOver++;
                }
            }
        }
    }

    if (movement === 0) { }
    if (movement === 0 && space === 0) { }
}

next = () => {
    for (let i = 0; i < 16; i++) {
        let divCreat = document.querySelector(`#container > div:nth-child(${i + 1})`);
        divCreat.innerText = b[i];
        if (b[i] === 0) {
            divCreat.style.color = 'transparent';
        } else {
            divCreat.style.color = 'black';
        }
    }
}

color = () => {
    var boxColor = 'transparent';
    for (let i = 0; i < 16; i++) {
        switch (b[i]) {
            case 2:
                boxColor = 'rgb(187, 255, 187)';
                break;
            case 4:
                boxColor = 'yellow';
                break;
            case 8:
                boxColor = 'rgb(0, 255, 0)';
                break;
            case 16:
                boxColor = 'rgb(2, 160, 2)';
                break;
            case 32:
                boxColor = 'skyblue';
                break;
            case 64:
                boxColor = 'rgb(0, 183, 255)';
                break;
            case 128:
                boxColor = 'rgb(2, 109, 151)';
                break;
            case 256:
                boxColor = 'rgb(166, 0, 255)';
                break;
            case 512:
                boxColor = 'rgb(255, 0, 179)';
                break;
            case 1024:
                boxColor = 'orange';
                break;
            case 2048:
                boxColor = 'red';
                break;
            default:
                boxColor = 'transparent';
                break;
        }
        colorCall(boxColor, i);
    }
}

colorCall = (boxColor, i) => {
    if (boxColor === 'transparent') {
        let divCreat = document.querySelector(`#container > div:nth-child(${i + 1})`);
        divCreat.classList.add('divColor');
        divCreat.style.backgroundColor = boxColor;
        divCreat.style.boxShadow = 'inset 2px 2px 5px gray';
    } else {
        let divCreat = document.querySelector(`#container > div:nth-child(${i + 1})`);
        divCreat.classList.add('divColor');
        divCreat.style.backgroundColor = boxColor;
        divCreat.style.boxShadow = 'inset 5px 5px 5px rgba(255, 255, 255, 0.5), inset -5px -5px 5px rgba(0, 0, 0, 0.5)';
    }
}

document.onkeydown = (event) => {
    switch (event.keyCode) {
        case 37:
            left();
            break;

        case 38:
            up();
            break;

        case 39:
            right();
            break;

        case 40:
            down();
            break;
    }
}

var swipe = document.getElementById('swipe');

swipe.addEventListener('swiped-left', left = () => {
    left();
})

swipe.addEventListener('swiped-up', up = () => {
    up();
})

swipe.addEventListener('swiped-right', right = () => {
    right();
})

swipe.addEventListener('swiped-down', down = () => {
    down();
})

left = () => {
    press = 37;
    movement = 0;
    for (let pr = 0; pr < 16; pr++) {
        p[pr] = b[pr];
    }
    for (let i = 1; i <= 13; i += 4) {
        let ban = 0;
        for (let j = i; j <= i + 2; j++) {
            if (b[j] === 0) {
                continue;
            } else {
                for (let k = j - 1; k >= i - 1; k--) {
                    if (b[k] != 0) {
                        if (b[k] === b[j]) {
                            b[k] += b[j];
                            b[j] = 0;
                            movement++;
                            ban++;
                            break;
                        } else {
                            break;
                        }

                    } else {
                        var inn = 0;
                        for (let l = k; l >= i - 1; l--) {
                            if (b[l] === 0) {
                                let temp = b[l];
                                b[l] = b[j + inn];
                                b[j + inn] = temp;
                                inn--;
                                movement++;
                                if (l === i - 1) {
                                    break;
                                }
                            } else {
                                if (ban != 0) {
                                    ban = 0;
                                } else if (b[j + inn] === b[j + inn - 1]) {
                                    b[j + inn - 1] += b[j + inn];
                                    b[j + inn] = 0;
                                    movement++;
                                    ban++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    randomNumber(movement, press);
    next();
    color();
    gameOverDisplay();
    gameOver = 0;
}

up = () => {
    press = 38;
    movement = 0;
    for (let pr = 0; pr < 16; pr++) {
        p[pr] = b[pr];
    }
    for (let i = 4; i < 8; i++) {
        let ban = 0;
        for (let j = i; j <= i + 8; j += 4) {
            if (b[j] === 0) {
                continue;
            } else {
                for (let k = j - 4; k >= 0; k -= 4) {
                    if (b[k] != 0) {
                        if (b[k] === b[j]) {
                            b[k] += b[j];
                            b[j] = 0;
                            movement++;
                            ban++;
                            break;
                        } else {
                            break;
                        }

                    } else {
                        var inn = 0;
                        for (let l = k; l >= 0; l -= 4) {
                            if (b[l] === 0) {
                                let temp = b[l];
                                b[l] = b[j + inn];
                                b[j + inn] = temp;
                                inn -= 4;
                                movement++;
                                if (l === 0) {
                                    break;
                                }
                            } else {
                                if (ban != 0) {
                                    ban = 0;
                                } else if (b[j + inn] === b[j + inn - 4]) {
                                    b[j + inn - 4] += b[j + inn];
                                    b[j + inn] = 0;
                                    movement++;
                                    ban++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    randomNumber(movement, press);
    next();
    color();
    gameOverDisplay();
    gameOver = 0;
}

right = () => {
    press = 39;
    movement = 0;
    for (let pr = 0; pr < 16; pr++) {
        p[pr] = b[pr];
    }
    for (let i = 2; i <= 14; i += 4) {
        let ban = 0;
        for (let j = i; j >= i - 2; j--) {
            if (b[j] === 0) {
                continue;
            } else {
                for (let k = j + 1; k <= i + 1; k++) {
                    if (b[k] != 0) {
                        if (b[k] === b[j]) {
                            b[k] += b[j];
                            b[j] = 0;
                            movement++;
                            ban++;
                            break;
                        } else {
                            break;
                        }

                    } else {
                        var inn = 0;
                        for (let l = k; l <= i + 1; l++) {
                            if (b[l] === 0) {
                                let temp = b[l];
                                b[l] = b[j + inn];
                                b[j + inn] = temp;
                                inn++;
                                movement++;
                                if (l === i + 1) {
                                    break;
                                }
                            } else {
                                if (ban != 0) {
                                    ban = 0;
                                } else if (b[j + inn] === b[j + inn + 1]) {
                                    b[j + inn + 1] += b[j + inn];
                                    b[j + inn] = 0;
                                    movement++;
                                    ban++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    randomNumber(movement, press);
    next();
    color();
    gameOverDisplay();
    gameOver = 0;
}

down = () => {
    press = 40;
    movement = 0;
    for (let pr = 0; pr < 16; pr++) {
        p[pr] = b[pr];
    }
    for (let i = 8; i < 12; i++) {
        let ban = 0;
        for (let j = i; j >= 0; j -= 4) {
            if (b[j] === 0) {
                continue;
            } else {
                for (let k = j + 4; k <= i + 4; k += 4) {
                    if (b[k] != 0) {
                        if (b[k] === b[j]) {
                            b[k] += b[j];
                            b[j] = 0;
                            movement++;
                            ban++;
                            break;
                        } else {
                            break;
                        }

                    } else {
                        var inn = 0;
                        for (let l = k; l <= i + 4; l += 4) {
                            if (b[l] === 0) {
                                let temp = b[l];
                                b[l] = b[j + inn];
                                b[j + inn] = temp;
                                inn += 4;
                                movement++;
                                if (l === i + 4) {
                                    break;
                                }
                            } else {
                                if (ban != 0) {
                                    ban = 0;
                                } else if (b[j + inn] === b[j + inn + 4]) {
                                    b[j + inn + 4] += b[j + inn];
                                    b[j + inn] = 0;
                                    movement++;
                                    ban++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    randomNumber(movement, press);
    next();
    color();
    gameOverDisplay();
    gameOver = 0;
}

gameOverDisplay = () => {
    if (gameOver === 12) {
        document.getElementById('over').style.zIndex = 1;
        document.getElementById('over').style.animation = 'visibility 1s ease-in-out';
    }
}

boxAdd = () => {
    for (let i = 0; i < 16; i++) {
        let boxValue = document.createTextNode(b[i]);
        let divCreat = document.createElement('div');
        divCreat.appendChild(boxValue);
        divCreat.classList.add('div');
        container.appendChild(divCreat);
        if (b[i] === 0) {
            random.push(i);
            divCreat.style.color = 'transparent';
        } else {
            divCreat.classList.add('div2');
        }
    }
}

reset = () => {
    b = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ];
    b[Math.floor(Math.random() * 16)] = 2;
    next();
    color();
    document.getElementById('over').style.zIndex = -1;
    document.getElementById('over').style.animation = 'visibility1 1s ease-in-out';
    document.getElementById('reset').style.animation = 'onclick 0.5s ease-in-out';
    document.querySelector('.gg-sync').style.animation = 'rotate 0.5s ease-in-out';
    setTimeout(() => {
        document.getElementById('reset').style.animation = 'onclick1 0.5s ease-in-out';
        document.querySelector('.gg-sync').style.animation = 'rotate1 0.5s ease-in-out';
    }, 500);
}

undo = () => {
    for (let i = 0; i < 16; i++) {
        b[i] = p[i];
    }
    next();
    color();
    document.getElementById('over').style.zIndex = -1;
    document.getElementById('over').style.animation = 'visibility1 1s ease-in-out';
    document.getElementById('undo').style.animation = 'onclick 0.5s ease-in-out';
    document.querySelector('.gg-undo').style.animation = 'rotate 0.5s ease-in-out';
    setTimeout(() => {
        document.getElementById('undo').style.animation = 'onclick1 0.5s ease-in-out';
        document.querySelector('.gg-undo').style.animation = 'rotate1 0.5s ease-in-out';
    }, 500);
}

main = () => {
    if (start === 0) {
        b[Math.floor(Math.random() * 16)] = 2;
        start++;
    }
    boxAdd();
    color();
}    

    main();

    // *********************************************************************************************

    (function (window, document) {
        'use strict';
        if (typeof window.CustomEvent !== 'function') {
            window.CustomEvent = function (event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            };
            window.CustomEvent.prototype = window.Event.prototype;
        }
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        var xDown = null;
        var yDown = null;
        var xDiff = null;
        var yDiff = null;
        var timeDown = null;
        var startEl = null;
        /**
         * Fires swiped event if swipe detected on touchend
         * @param {object} e - browser event object
         * @returns {void}
         */
        function handleTouchEnd(e) {
            if (startEl !== e.target) return;

            var swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10);
            var swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10);
            var timeDiff = Date.now() - timeDown;
            var eventType = '';
            var changedTouches = e.changedTouches || e.touches || [];

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                    if (xDiff > 0) {
                        eventType = 'swiped-left';
                    }
                    else {
                        eventType = 'swiped-right';
                    }
                }
            }
            else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (yDiff > 0) {
                    eventType = 'swiped-up';
                }
                else {
                    eventType = 'swiped-down';
                }
            }

            if (eventType !== '') {
                var eventData = {
                    dir: eventType.replace(/swiped-/, ''),
                    touchType: (changedTouches[0] || {}).touchType || 'direct',
                    xStart: parseInt(xDown, 10),
                    xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
                    yStart: parseInt(yDown, 10),
                    yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10)
                };
                startEl.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));
                startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
            }
            xDown = null;
            yDown = null;
            timeDown = null;
        }

        /**
         * Records current location on touchstart event
         * @param {object} e - browser event object
         * @returns {void}
         */
        function handleTouchStart(e) {
            if (e.target.getAttribute('data-swipe-ignore') === 'true') return;
            startEl = e.target;
            timeDown = Date.now();
            xDown = e.touches[0].clientX;
            yDown = e.touches[0].clientY;
            xDiff = 0;
            yDiff = 0;
        }

        /**
         * Records location diff in px on touchmove event
         * @param {object} e - browser event object
         * @returns {void}
         */
        function handleTouchMove(e) {

            if (!xDown || !yDown) return;

            var xUp = e.touches[0].clientX;
            var yUp = e.touches[0].clientY;

            xDiff = xDown - xUp;
            yDiff = yDown - yUp;
        }

        /**
         * Gets attribute off HTML element or nearest parent
         * @param {object} el - HTML element to retrieve attribute from
         * @param {string} attributeName - name of the attribute
         * @param {any} defaultValue - default value to return if no match found
         * @returns {any} attribute value or defaultValue
         */
        function getNearestAttribute(el, attributeName, defaultValue) {
            while (el && el !== document.documentElement) {
                var attributeValue = el.getAttribute(attributeName);
                if (attributeValue) {
                    return attributeValue;
                }
                el = el.parentNode;
            }
            return defaultValue;
        }
    }(window, document));
