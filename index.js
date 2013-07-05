$( function() {
    var awards = {}
    loadAward( 'Hugo', 'book', '/en/hugo_award', awards )
    loadAward( 'Nebula', 'book', '/en/nebula_award', awards )
    loadAward( 'Academy', 'movie', '/en/academy_awards', awards )

    $(".path.input").pathAutocomplete( awards )
} )
