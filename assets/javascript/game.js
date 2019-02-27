const log = console.log;

function blackPanther() {
    log('ready!');

    const characterImages = [
        {
            src: './assets/images/black_panther.png',
            alt: 'black panther'
        }, {
            src: './assets/images/killmonger.png',
            alt: 'killmonger'
        }, {
            src: './assets/images/klaw.png',
            alt: 'klaw'
        }, {
            src: './assets/images/man_ape.png',
            alt: 'man ape'
        }
    ];

    function displayCharacters(array) {
        array.forEach((element, i) => {
            var image = $('<img>');
            image.attr('class', 'character');
            image.attr('src', element.src);
            image.attr('alt', element.alt);
            $('.characters').append(image);
        });
    }
    
    displayCharacters(characterImages)




}


$(document).ready(function () {
    blackPanther();
})