

import "./index.scss";


const conf = {
    directionClearTime : 1500,
    directionForceTop : 10,
    directionToleranceDown : 50,
    directionToleranceUp : 50,
    hiddenClass : "hidden",
    offsetClass : "offset",
    offsetRatio : 0.33
};

let forceShowNav = false;


const initializeScrollDirectionEvents = function(){

    let lastTop = document.body.scrollTop;
    let clearLasts = null;
    let lastDir = null;
    let lastDown = 0;
    let lastUp = 0;
    let st = 0;

    const getScrollTop = function(){

        return window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    };

    const clear = function(){

        window.clearTimeout(clearLasts);

        /*
            * Forget how much up and down has been happening
            * if nothing happens for a while
            */
        clearLasts = window.setTimeout(() => {

            lastDown = 0;
            lastUp = 0;

        }, conf.directionClearTime);

    };

    const atTop = function(){

        return st <= 0;

    };

    const goingUp = function(){

        return st < conf.directionForceTop || lastDir !== "up" && lastUp > conf.directionToleranceUp;

    };

    const goingDown = function(){

        return st > conf.directionForceTop && lastDown > conf.directionToleranceDown && lastDir !== "down";

    };

    let onScroll = function(){

        clear();

        st = getScrollTop();

        if(atTop() || forceShowNav){

            lastDir = "up";

            document.querySelector("nav").classList.remove(conf.hiddenClass);

        }else if(st < lastTop){

            lastDown = 0;

            lastUp += lastTop - st;

            if(goingUp()){

                lastDir = "up";

                document.querySelector("nav").classList.remove(conf.hiddenClass);

            }

        }else if(st > lastTop){

            lastUp = 0;

            lastDown += st - lastTop;

            if(goingDown()){

                lastDir = "down";

                document.querySelector("nav").classList.add(conf.hiddenClass);

            }

        }

        if(st < 30){
            document.querySelector("nav").classList.remove(conf.offsetClass);
        }else{
            document.querySelector("nav").classList.add(conf.offsetClass);
        }

        lastTop = st;

    };

    onScroll = onScroll.bind(this);

    document.addEventListener("scroll", onScroll);

    onScroll();

};

$(() => {

    $(".how-we-help .do-column").click((evt) => {

        $(".how-we-help .do-column").removeClass("selected");
        $(".do-copy").removeClass("selected");

        $(evt.currentTarget).addClass("selected");

        $(".our-projects .do-box").removeClass("selected");
        $(".our-projects .do-box").eq($(evt.currentTarget).index()).addClass("selected");

        evt.preventDefault();

        return false;

    });

    $(".head ul li a").click((evt) => {

        $("nav a[href='" + $(evt.currentTarget).attr("href") + "']").click();

    });

    $("nav a").click((evt) => {

        forceShowNav = true;

        const target = $(evt.currentTarget).attr("rel");
        const top = $("#" + target).offset().top - 70;

        $("html, body").stop().animate({ scrollTop : top}, 500, "swing", () => {

            forceShowNav = false;

        });

        evt.preventDefault();

        return false;

    });

    $(".do-box li").click((evt) => {

        $(".do-copy").removeClass("selected");
        $(".do-box li").removeClass("selected");

        const cls = $(evt.currentTarget).attr("class");

        $(evt.currentTarget).addClass("selected");
        $(`.do-copy.${ cls }`).addClass("selected");

    });

    $(".how-we-help .do-column:eq(0)").click();

    initializeScrollDirectionEvents();

});
