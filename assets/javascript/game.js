const log = console.log;

function blackPanther() {

    const characterImages = [
        {
            src: './assets/images/black_panther.png',
            alt: 'black_panther',
            name: 'Black Panther',
            initialPoints: 210
        }, {
            src: './assets/images/killmonger.png',
            alt: 'killmonger',
            name: 'Killmonger',
            initialPoints: 200
        }, {
            src: './assets/images/klaw.png',
            alt: 'klaw',
            name: 'Klaw',
            initialPoints: 198
        }, {
            src: './assets/images/man_ape.png',
            alt: 'man_ape',
            name: 'Man Ape',
            initialPoints: 215
        }
    ];


    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    function displayCharacters(array) {


        array.forEach(element => {

            // Character Image
            var image = $('<img>');
            image.attr('class', 'character');
            image.attr('id', element.alt);
            image.attr('src', element.src);
            image.attr('alt', element.alt);

            // adding popover to image
            var span = $('<span>');
            span.attr('data-container', 'body');
            span.attr('id', 'span_' + element.alt);
            span.attr('data-trigger', 'hover');
            span.attr('data-toggle', 'popover');
            span.attr('data-placement', 'bottom');
            span.attr('data-content', element.name);

            $('.characters').append(span.append(image));
        });
    }

    function displayInstructions(instructions) {
        $('.user_instructions').text(instructions);
    }


    displayInstructions('Choose your character');
    displayCharacters(characterImages);

    $('[data-toggle="popover"]').popover();
}


$(document).ready(function () {
    blackPanther();
})