path-autocomplete
=================

Path segmented autocomplete for jQuery

## Usage

In your HTML, include two text inputs:

    <input class="path suggest" type="text" />
    <input class="path input" name="refs[]" type="text" />

In your CSS, style those inputs:

    .path.suggest {
        position: absolute;
        z-index: 1;
        color: #888;
    }
    
    .path.input {
        position: relative;
        z-index: 2;
        background: transparent;
    }

Finally, include [jquery.path-autocomplete.js](//wholcomb.github.io/path-autocomplete/jquery.path-autocomplete.js) in your page and from Javascript, call:

    $(".path.input").pathAutocomplete( {
      /* Object to autocomplete from */
    } )

## Source

Originally from [Vanista](http://stackoverflow.com/questions/14144970/jquery-autocomplete-path-bash-style#answer-14245999)
