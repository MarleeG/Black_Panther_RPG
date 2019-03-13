// after the user clicks on restart game button, game should restart...
const log = console.log;

$(document).ready(function () {
    let characterChosen = '';

    // finds character selected and places it in first div;
    let positionCounter = 1;
    let currentDefender = '';
    var attackCount = 1;
    let showBattleAlert = true;
    let colPosition = 2;
    let defeatedTotal = 0;
    let round = 1;
    let yourAttack = 0;
    let newAttackCount = false;

    var usersAttackPower = undefined;
    var currentDefendersAttackPower = undefined;

    let newVibraniumPower = true;
    // log(`newVibraniumPower: ${newVibraniumPower}`);

    function newVibPower(newPower) {
        if (round >= 2) {
            attackCount = 0;
        } else if (round === 1) {
            attackCount = 1;
        }

        if (newPower) {
            newAttackCount = true;
            // yourAttack = 0;
            usersAttackPower = attackPower(25);
            currentDefendersAttackPower = attackPower(25);

            // yourAttack = usersAttackPower * attackCount;
            newVibraniumPower = false;
        }




        log(`------------------------`);
        log(`newPower: ${newPower}`);
        log(`usersAttackPower: ${usersAttackPower}`);
        log(`currentDefendersAttackPower: ${currentDefendersAttackPower}`);
        log(`attackCount: ${attackCount}`);
        log(`------------------------`);
    }

    newVibPower(newVibraniumPower);

    var characterImages = [
        {
            src: './assets/images/black_panther.png',
            alt: 'black_panther',
            name: 'Black Panther',
            vibraniumPower: 210,
            originalPower: 210,
            position: '',
            defeated: false
        }, {
            src: './assets/images/killmonger.png',
            alt: 'killmonger',
            name: 'Killmonger',
            vibraniumPower: 200,
            originalPower: 205,
            position: '',
            defeated: false
        }, {
            src: './assets/images/klaw.png',
            alt: 'klaw',
            name: 'Klaw',
            vibraniumPower: 200,
            originalPower: 200,
            position: '',
            defeated: false
        }, {
            src: './assets/images/man_ape.png',
            alt: 'man_ape',
            name: 'Man Ape',
            vibraniumPower: 215,
            originalPower: 215,
            position: '',
            defeated: false
        }
    ];

    $('.users_player').hide();
    $('.enemies').hide();
    $('.dps_titles').hide();
    $('#battle_alert').hide();
    $('.display_winner').hide();
    updateRound();


    function updateRound() {
        $('#round').text(`Round ${round}`);
    }

    // restarts the game
    function restartGame() {
        newAttackCount = false;
        defeatedTotal = 0;
        positionCounter = 1;
        attackCount = 1;
        colPosition = 2;
        yourAttack = 0;
        round = 1;
        showBattleAlert = true;
        $('#battle_alert').hide();
        $('.users_player').hide();
        $('.enemies').hide();
        $('.pre_dps').show();
        $('.display_winner').hide();
        $('#round').show();


        $('.pickDefenderStance').hide();
        $('.characters').show();
        updateRound();


        // Takes everyone back to their original position in the game
        characterImages.forEach(element => {
            element.position = '';
            element.defeated = false
        });

        // remove all classes that are defenders
    }

    function attackPower(maxAttackPower) {
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
            // image.addClass('');

            // adding popover to image
            var span = $('<span>');
            span.attr('data-container', 'body');
            span.attr('id', 'span_' + element.alt);
            span.attr('class', 'span_wrap')
            span.attr('data-trigger', 'hover');
            span.attr('data-toggle', 'popover');
            span.attr('data-placement', 'bottom');
            span.attr('data-content', element.name);
            span.addClass('displayCharacters_IMG_SPAN');
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


    // Allow the user to select a defender
    $('.character').click(function (event) {
        characterChosen = event.target.attributes[4].textContent;

        $('.users_player').text(`Your character`);
        $('.enemies').text(`Defenders`);
        $('.users_player').show();
        $('.enemies').show();

        // Hides all characters displayed
        $('.displayCharacters_IMG_SPAN').hide();
        $('.characters').hide();

        // display new instructions
        displayInstructions('Select a defender');

        // $('img.character').remove();
        // $('#span_klaw').remove();
        // $('#span_black_panther').remove();
        // $('#span_man_ape').remove();
        // $('#span_killmonger').remove();



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

            log(`round: ${round}`);

            if (element.name === characterChosen) {
                element.position = 'your character';
                $('.pickDefenderStance').show();
                $('div.first').append(span.append(imageOfChosenCharacter));
                // logs my character chosent
                // log(`Your character: ${JSON.stringify(element)}`);
            }

            if (element.defeated === true) {
                log(`element.name !== characterChosen :${element.name !== characterChosen}`);
                log(`element.defeated === false :${element.defeated === false} `);
            }

            if (element.name !== characterChosen && element.defeated === false) {
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
            }
        });

        // This will show the defenderPickedStance position 
        $('.defender').click(function (event) {
            let { name } = event.target;
            let defendersLeftToDisplay = 2;

            displayInstructions('Battle!');

            $('.pre_dps').hide();
            $('.dps_titles').show();

            $('.defenderPickedStance_IMG_SPAN').remove();
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
                span.addClass('defenderPickedStance_IMG_SPAN');

                // If the position is the character the user initially picked then...
                if (element.position === 'your character') {
                    $('#attackButton').remove();
                    $('div.dps_first').append(span.append(yourCharacter));
                    var attackButton = $('<button type="button" id="attackButton" class="btn btn-danger btn-lg attackButton">Attack</button>');
                    $('div.dps_first').append(attackButton);
                }

                // Locate the name of the chosen defender to display it on the screen
                if (element.name === name && element.defeated === false) {
                    // Display the chosen defender here
                    $('.dps_second').append(span.append(yourCharacter));
                    currentDefender = name;

                } else if (element.name !== name && element.position !== 'your character' && element.defeated === false) {
                    if (defendersLeftToDisplay === 2) {
                        $('.dps_third').append(span.append(yourCharacter));
                        defendersLeftToDisplay--;
                    } else {
                        $('.dps_fourth').append(span.append(yourCharacter));
                    }
                }
            });

            // log(`Chosen defender:  ${name}`);
            $('[data-toggle="popover"]').popover();
        });

        $('[data-toggle="popover"]').popover();
    });


    function battleAlertText(defendersName, defendersAttackPower, yourAttackPower) {
        $('#your_attack_text').text(`You attacked ${defendersName} for ${yourAttackPower} damage`);
        $('#defenders_attack_text').text(`${defendersName} attacked you back for ${defendersAttackPower} damage.`);
    }


    // add functionality to attack button
    // var usersAttackPower = 0;
    // var currentDefendersAttackPower = 0;

    // if (newVibraniumPower) {
    //     var usersAttackPower = attackPower(25);
    //     var currentDefendersAttackPower = attackPower(25);

    //     newVibraniumPower = false;
    //     log(`--------------------------------------`);
    //     log(`newVibPower: ${newVibraniumPower}`);
    //     log(`usersAttackPower: ${usersAttackPower}`);
    //     log(`currentDefendersAttackPower: ${currentDefendersAttackPower}`);
    //     log(`--------------------------------------`);


    // }

    $(document).on('click', '#attackButton', function (event) {
        yourAttack = usersAttackPower * attackCount;


        round === 2 ? log(`Your attack ${usersAttackPower} * ${attackCount}`) : log('');

        if (showBattleAlert) {
            // Displays battle alert
            $('#battle_alert').show();
            showBattleAlert = false;

            $('.defenderPickedStance').show();
            $('.pickDefenderStance').hide();
            $('.pre_dps').hide();
            $('h4.user_instructions').text(`Battle`);
            $('.dps_titles').show();
            $('#battle_alert').show();
        }

        $('#your_attack_text').text(`You attacked ${currentDefender} for ${yourAttack} damage`);
        log(`Your attack power: ${yourAttack}`);
        $('#defenders_attack_text').text(`${currentDefender} attacked you back for ${currentDefendersAttackPower} damage.`);

        characterImages.forEach(element => {
            // If the element in the loop is the same as the character the user chose then subtract the currentDefendersAttackPower from the characterChosen's vibraniumPower
            if (element.name === characterChosen) {
                element.vibraniumPower = element.vibraniumPower - currentDefendersAttackPower;
                // log(`Remaining Vibranium Power for ${characterChosen} || ${element.vibraniumPower}`)

                let popoverYourCharacter = $('span#span_' + element.alt);
                popoverYourCharacter.attr('data-content', element.name + ': ' + element.vibraniumPower);


                // Subtract the amount that the defender attacked me with from my vibraniumPower
                // $('#your_attack_text').text(`You attacked ${currentDefender} for ${usersAttackPower} damage`);
                // $('#defenders_attack_text').text(`${currentDefender} attacked you back for ${currentDefendersAttackPower} damage.`);
            }

            if (element.name === currentDefender) {
                element.vibraniumPower = element.vibraniumPower - yourAttack;
                // log(`Remaining Vibranium Power for ${currentDefender} || ${element.vibraniumPower}`);
                var popoverDefender = $('span#span_' + element.alt);
                popoverDefender.attr('data-content', element.name + ': ' + element.vibraniumPower);

                if (element.vibraniumPower <= 0) {
                    // Ask user to pick a new defender

                    element.defeated = true;
                    defeatedTotal++;


                    // Gives Chosen Character their original power
                    characterChosensOriginalPower();


                    newVibraniumPower = true;
                    newVibPower(newVibraniumPower);

                    chooseAnotherDefender(element.name);
                    round++;

                    if (round === 4) {
                        $('#round').hide();
                    }

                    log(`newVibraniumPower: ${newVibraniumPower}`)
                    updateRound();

                    log(`defeated total: ${defeatedTotal}`);

                    if (defeatedTotal >= 3) {
                        // debugger;
                        displayInstructions("Congrats! You've won 🎉");
                        // $('.user_instructions').text(" ");
                        $('.pickDefenderStance').remove();
                        $('.display_winner').show();
                        $('.three_winners').hide();
                        $('.pre_dps').hide();

                        log(`Winner is: ${characterChosen}`);

                        characterImages.forEach(item => {
                            // If the character the user chose is the same as the one shown in array then display as winner
                            if (item.name === characterChosen) {
                                // $('#one_player_win').
                                // Character Image
                                let imageOfWinner = $('<img>');
                                imageOfWinner.attr('class', 'character');
                                imageOfWinner.attr('id', item.alt);
                                imageOfWinner.attr('src', item.src);
                                imageOfWinner.attr('alt', item.alt);
                                imageOfWinner.attr('name', item.name);

                                // adding popover to image
                                let spanOfWinner = $('<span>');
                                spanOfWinner.attr('data-container', 'body');
                                spanOfWinner.attr('id', 'span_' + item.alt);
                                spanOfWinner.attr('class', 'span_wrap')
                                spanOfWinner.attr('data-trigger', 'hover');
                                spanOfWinner.attr('data-toggle', 'popover');
                                spanOfWinner.attr('data-placement', 'bottom');
                                spanOfWinner.attr('data-content', item.name);
                                // span.addClass('displayCharacters_IMG_SPAN');
                                $('#one_player_win').append(spanOfWinner.append(imageOfWinner));
                            }

                        });


                        let playAgainButton = $('<button type="button" id="play_again_button" class="btn btn-dark btn-lg">Dare to play?</button>');
                        $('.play_again_one_winner').append(playAgainButton);
                    }

                }
            }
        });
        attackCount++;

        if (round >= 2 && newAttackCount) {
            attackCount = 1;
            newAttackCount = false;
        }

    });

    $(document).on('click', '#play_again_button', function () {
        log(`PLAY AGAIN BUTTON CLICKED`);

        displayInstructions('Choose your character');
        displayCharacters(characterImages);
        $('.pickDefenderStance').hide();


        restartGame();
        newVibPower(newVibraniumPower);



    });

    function chooseAnotherDefender(defenderDefeatedName) {
        showBattleAlert = true;
        $('.defenderPickedStance').hide();
        $('.pickDefenderStance').show();
        $('h4.user_instructions').text(`Select a defender`);
        $('.dps_titles').hide();
        $('.pre_dps').show();
        $('#battle_alert').hide();

        characterImages.forEach(element => {
            // if the position is a defender has not been defeated yet then display it. 
            if (element.name === defenderDefeatedName || element.defeated === true) {
                $(`img.defender#${element.alt}`).remove();
            }
        });
    }

    function characterChosensOriginalPower() {
        characterImages.forEach(element => {
            if (element.name === characterChosen) {
                element.vibraniumPower = element.originalPower;


                let popoverYourCharacter = $('span#span_' + element.alt);
                popoverYourCharacter.attr('data-content', element.name + ': ' + element.vibraniumPower);
            }
        });
    }


    $('[data-toggle="popover"]').popover();

});