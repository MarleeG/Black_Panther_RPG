const log = console.log;

$(document).ready(function () {
    let characterChosen = '';

    const characterImages = [
        {
            src: './assets/images/black_panther.png',
            alt: 'black_panther',
            name: 'Black Panther',
            vibraniumPower: 210
        }, {
            src: './assets/images/killmonger.png',
            alt: 'killmonger',
            name: 'Killmonger',
            vibraniumPower: 200
        }, {
            src: './assets/images/klaw.png',
            alt: 'klaw',
            name: 'Klaw',
            vibraniumPower: 198
        }, {
            src: './assets/images/man_ape.png',
            alt: 'man_ape',
            name: 'Man Ape',
            vibraniumPower: 215
        }
    ];

    // restarts the game
    function restartGame() {
        $('.battleStance').hide();
        $('.characters').show();
    }

    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    // displays characters on the screen
    function displayCharacters(array) {
        array.forEach(element => {

            // Character Image
            var image = $('<img>');
            image.attr('class', 'character');
            image.attr('id', element.alt);
            image.attr('src', element.src);
            image.attr('alt', element.alt);
            image.attr('name', element.name);

            // adding popover to image
            var span = $('<span>');
            span.attr('data-container', 'body');
            span.attr('id', 'span_' + element.alt);
            span.attr('class', 'span_wrap')
            span.attr('data-trigger', 'hover');
            span.attr('data-toggle', 'popover');
            span.attr('data-placement', 'bottom');
            span.attr('data-content', element.name);

            $('.characters').append(span.append(image));
        });
    }

    // displays instructions for the user
    function displayInstructions(instructions) {
        $('.user_instructions').text(instructions);
    }



    displayInstructions('Choose your character');
    displayCharacters(characterImages);
    $('.battleStance').hide();

    $('[data-toggle="popover"]').popover();


    // Allow the user to select a character
    $('.character').click(function (event) {
        characterChosen = event.target.attributes[4].textContent;

        // Hides all characters displayed
        $('.characters').hide();

        // display new instructions
        displayInstructions('Battle!')

        // finds character selected and places it in first div;
        let positionCounter = 1;
        characterImages.forEach(element => {

            // Character Image
            var imageOfChosenCharacter = $('<img>');
            imageOfChosenCharacter.attr('class', 'character');
            imageOfChosenCharacter.attr('id', element.alt);
            imageOfChosenCharacter.attr('src', element.src);
            imageOfChosenCharacter.attr('alt', element.alt);
            imageOfChosenCharacter.attr('name', element.name);

            // adding popover to image
            var span = $('<span>');
            span.attr('data-container', 'body');
            span.attr('id', 'span_' + element.alt);
            span.attr('class', 'span_wrap')
            span.attr('data-trigger', 'hover');
            span.attr('data-toggle', 'popover');
            span.attr('data-placement', 'bottom');
            span.attr('data-content', element.name);


            if (element.name === characterChosen) {
                $('.battleStance').show();
                $('div.first').append(span.append(imageOfChosenCharacter));
                log(element);
            }

            if (element.name !== characterChosen) {
                if (positionCounter === 1) {
                    $('div.second').append(span.append(imageOfChosenCharacter));
                    positionCounter++;
                } else if (positionCounter === 2) {
                    $('div.third').append(span.append(imageOfChosenCharacter));
                    positionCounter++;
                } else if (positionCounter === 3) {
                    $('div.fourth').append(span.append(imageOfChosenCharacter));
                }
            }
        });

        $('[data-toggle="popover"]').popover();
        log(`Character Chosen: ${characterChosen}`)
    });

    $('[data-toggle="popover"]').popover();

});
