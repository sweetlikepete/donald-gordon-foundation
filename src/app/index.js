

import "./index.scss";


$(() => {

    $(".how-we-help .do-column").click((evt) => {

        $(".how-we-help .do-column").removeClass("selected");

        $(evt.currentTarget).addClass("selected");

        $(".our-projects .do-box").removeClass("selected");
        $(".our-projects .do-box").eq($(evt.currentTarget).index()).addClass("selected");

        evt.preventDefault();

        return false;

    });

    $(".how-we-help .do-column:eq(0)").click();

});