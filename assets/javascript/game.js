const log = console.log;


$(document).ready(function () {
    let characterChosen = '';

    // finds character selected and places it in first div;
    let positionCounter = 1;
    let currentDefender = '';

    var characterImages = [
        {
            src: './assets/images/black_panther.png',
            alt: 'black_panther',
            name: 'Black Panther',
            vibraniumPower: 210,
            position: ''
        }, {
            src: './assets/images/killmonger.png',
            alt: 'killmonger',
            name: 'Killmonger',
            vibraniumPower: 200,
            position: ''
        }, {
            src: './assets/images/klaw.png',
            alt: 'klaw',
            name: 'Klaw',
            vibraniumPower: 198,
            position: ''
        }, {
            src: './assets/images/man_ape.png',
            alt: 'man_ape',
            name: 'Man Ape',
            vibraniumPower: 215,
            position: ''
        }
    ];

    $('.users_player').hide();
    $('.enemies').hide();
    $('.dps_titles').hide();
    $('#battle_alert').hide();


    // restarts the game
    function restartGame() {
        positionCounter = 1;
        $('#battle_alert').hide();
        $('.users_player').hide();
        $('.enemies').hide();
        $('.pre_dps').show();

        $('.pickDefenderStance').hide();
        $('.characters').show();


        // Takes everyone back to their original position in the game
        characterImages.forEach(element => {
            element.position = '';
        });

        // remove all classes that are defenders
    }

    function attackPower(maxAttackPower){
        return Math.floor((Math.random() * maxAttackPower) + 1)
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
    $('.pickDefenderStance').hide();

    $('[data-toggle="popover"]').popover();


    // Allow the user to select a character
    $('.character').click(function (event) {
        characterChosen = event.target.attributes[4].textContent;

        $('.users_player').text(`Your character`);
        $('.enemies').text(`defenders`);
        $('.users_player').show();
        $('.enemies').show();

        // Hides all characters displayed
        $('.characters').hide();

        // display new instructions
        displayInstructions('Select a defender');


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
            span.attr('data-content', element.name + ': ' + element.vibraniumPower);


            if (element.name === characterChosen) {
                element.position = 'your character';

                $('.pickDefenderStance').show();

                $('div.first').append(span.append(imageOfChosenCharacter));

                // logs my character chosent
                // log(`Your character: ${JSON.stringify(element)}`);
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
                element.position = 'defender';


                imageOfChosenCharacter.addClass('defender');

                // Logs all the defenders
                // log(`defender: ${JSON.stringify(element)}`);
            }
        });

        // This will show the defenderPickedStance position 
        $('.defender').click(function (event) {
            let { name } = event.target;
            let defendersLeftToDisplay = 2;

            displayInstructions('Battle!');

            $('.pre_dps').hide();
            $('.dps_titles').show();
            $('.pickDefenderStance').hide();
            $('.defenderPickedStance').show();

            characterImages.forEach(element => {

                // image
                var yourCharacter = $('<img>');
                yourCharacter.attr('class', 'character');
                yourCharacter.attr('id', element.alt);
                yourCharacter.attr('src', element.src);
                yourCharacter.attr('alt', element.alt);
                yourCharacter.attr('name', element.name);

                // adding popover to image
                var span = $('<span>');
                span.attr('data-container', 'body');
                span.attr('id', 'span_' + element.alt);
                span.attr('class', 'span_wrap')
                span.attr('data-trigger', 'hover');
                span.attr('data-toggle', 'popover');
                span.attr('data-placement', 'bottom');
                span.attr('data-content', element.name + ': ' + element.vibraniumPower);

                // If the position is the character the user initially picked then...
                if (element.position === 'your character') {
                    $('div.dps_first').append(span.append(yourCharacter));
                    var attackButton = $('<button type="button" id="attackButton" class="btn btn-danger btn-lg attackButton">Attack</button>');
                    $('div.dps_first').append(attackButton);

                    log(`Your character: ${element.name}`);
                }

                // Locate the name of the chosen defender to display it on the screen
                if (element.name === name) {
                    // Display the chosen defender here
                    $('.dps_second').append(span.append(yourCharacter));
                    currentDefender = name;

                } else if (element.name !== name && element.position !== 'your character') {
                    if (defendersLeftToDisplay === 2) {
                        $('.dps_third').append(span.append(yourCharacter));
                        defendersLeftToDisplay--;
                    } else {
                        $('.dps_fourth').append(span.append(yourCharacter));
                    }
                }
            });

            // Logs the defender clicked
            log(`Chosen defender:  ${name}`);
            $('[data-toggle="popover"]').popover();
        });


        $('[data-toggle="popover"]').popover();
    });

    // add functionality to attack button
    $(document).on('click','#attackButton', function (event) {
        log(`----------------------------------------`);
        log(`Character chosen ${characterChosen}`);
        log(`Current Defender: ${currentDefender}`);
        log(`----------------------------------------`);

        $('#battle_alert').show();


        characterImages.forEach(element => {
            if(element.name === characterChosen){
                element.attackPower = attackPower(30);
            }
        });

        log('clicked attack button');
    });

    $('[data-toggle="popover"]').popover();

});