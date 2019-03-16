$(document).ready(function () {
    let characterChosen = '';

    // finds character selected and places it in first div;
    let positionCounter = 1;
    let currentDefender = '';
    var attackCount = 1;
    let showBattleAlert = true;
    // let colPosition = 2;
    let defeatedTotal = 0;
    let round = 1;
    let yourAttack = 0;
    let newAttackCount = false;
    let defenderWinStatus = false;

    var usersAttackPower = undefined;
    var currentDefendersAttackPower = undefined;

    let newVibraniumPower = true;


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
            originalPower: 200,
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

        $('.span_wrap').hide();
        $('img.character').hide();
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
                        defendersLeftToDisplay--;
                    }
                }
            });

            $('[data-toggle="popover"]').popover();
        });

        $('[data-toggle="popover"]').popover();
    });

    $(document).on('click', '#attackButton', function (event) {
        yourAttack = usersAttackPower * attackCount;

        if (showBattleAlert) {
            // Displays battle alert
            $('#battle_alert').show();
            showBattleAlert = false;
            $('.defenderPickedStance').show();
            $('.pre_dps').hide();
            $('h4.user_instructions').text(`Battle`);
            $('.dps_titles').show();
        }

        $('#your_attack_text').text(`You attacked ${currentDefender} for ${yourAttack} damage`);
        $('#defenders_attack_text').text(`${currentDefender} attacked you back for ${currentDefendersAttackPower} damage.`);

        characterImages.forEach(element => {
            // If the element in the loop is the same as the character the user chose then subtract the currentDefendersAttackPower from the characterChosen's vibraniumPower
            if (element.name === characterChosen) {
                element.vibraniumPower = element.vibraniumPower - currentDefendersAttackPower;

                let popoverYourCharacter = $('span#span_' + element.alt);
                popoverYourCharacter.attr('data-content', element.name + ': ' + element.vibraniumPower);

                // if the character the user chose has vibraniumPower 0 and below they've lost the game
                if (element.vibraniumPower <= 0) {
                    defenderWinStatus = true;
                    element.defeated = true;

                    if (defenderWinStatus) {
                        displayInstructions("The Defenders Won 💀");
                        $('.pickDefenderStance').remove();
                        $('#round').hide();
                        $('.defenderPickedStance').hide();
                        $('#battle_alert').hide();
                        $('.dps_titles').hide();
                        $('.one_winner').hide();
                        $('.pre_dps').hide();
                        $('.display_winner').show();
                    }

                    let winningPosition = 0;
                    characterImages.forEach((item, i) => {

                        // If the character the user chose is the same as the one shown in array then display as winner
                        if (item.name !== characterChosen) {
                            winningPosition++
                            let imageOfWinningDefender = $('<img>');
                            imageOfWinningDefender.attr('class', 'character');
                            imageOfWinningDefender.attr('id', item.alt);
                            imageOfWinningDefender.attr('src', item.src);
                            imageOfWinningDefender.attr('alt', item.alt);
                            imageOfWinningDefender.attr('name', item.name);

                            // adding popover to image
                            let spanOfWinningDefender = $('<span>');
                            spanOfWinningDefender.attr('data-container', 'body');
                            spanOfWinningDefender.attr('id', 'span_' + item.alt);
                            spanOfWinningDefender.attr('class', 'span_wrap')
                            spanOfWinningDefender.attr('data-trigger', 'hover');
                            spanOfWinningDefender.attr('data-toggle', 'popover');
                            spanOfWinningDefender.attr('data-placement', 'bottom');
                            spanOfWinningDefender.attr('data-content', item.name);
                            $(`.defender_${winningPosition}_winner`).append(spanOfWinningDefender.append(imageOfWinningDefender));
                        }
                    });
                    let playAgainButton = $('<button type="button" id="play_again_button" class="btn btn-dark btn-lg">Dare to play?</button>');
                    $('.play_again_one_winner').append(playAgainButton);
                }
            }

            if (element.name === currentDefender) {
                element.vibraniumPower = element.vibraniumPower - yourAttack;
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

                    updateRound();

                    if (defeatedTotal >= 3) {
                        displayInstructions("Congrats! You've won 🎉");
                        // $('.user_instructions').text(" ");
                        $('.pickDefenderStance').remove();
                        $('.display_winner').show();
                        $('.three_winners').hide();
                        $('.pre_dps').hide();

                        characterImages.forEach(e => {
                            // If the character the user chose is the same as the one shown in array then display as winner
                            if (e.name === characterChosen) {
                                let imageOfWinner = $('<img>');
                                imageOfWinner.attr('class', 'character');
                                imageOfWinner.attr('id', e.alt);
                                imageOfWinner.attr('src', e.src);
                                imageOfWinner.attr('alt', e.alt);
                                imageOfWinner.attr('name', e.name);

                                // adding popover to image
                                let spanOfWinner = $('<span>');
                                spanOfWinner.attr('data-container', 'body');
                                spanOfWinner.attr('id', 'span_' + e.alt);
                                spanOfWinner.attr('class', 'span_wrap')
                                spanOfWinner.attr('data-trigger', 'hover');
                                spanOfWinner.attr('data-toggle', 'popover');
                                spanOfWinner.attr('data-placement', 'bottom');
                                spanOfWinner.attr('data-content', e.name);
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
        // refreshes page to restart game
        location.reload();
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
                $(`img.defender#${element.alt}`).parent().parent().remove();
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