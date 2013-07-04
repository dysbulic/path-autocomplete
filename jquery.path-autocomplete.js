var paths = {
    "a": {
        "1": {
            "m": "",
            "n": "",
            "o": "",
            "previous": "",
            "current": ""
        }
    },
    "b": {
        "1": {
            "n": "",
            "previous": "",
            "current": ""
        },
        "2": {
            "m": "",
            "n": "",
            "o": "",
            "previous": "",
            "current": ""
        }
    },
    "somedir-x": {
        "3": {
            "nothing-m": "",
            "nothing-n": "",
            "nothing-o": "",
            "previous": "",
            "current": ""
        }
    },
    "somedir-y": {
        "next-1": {
            "other-n": "",
            "previous": "",
            "current": ""
        },
        "next-2": {
            "other-m": "",
            "other-o": "",
            "previous": "",
            "current": ""
        },
        "next-3": {
            "other-o": "",
            "previous": "",
            "current": ""
        }
    }
}

// From: http://stackoverflow.com/questions/14144970/jquery-autocomplete-path-bash-style#answer-14245999

// tokenize a path string into an array
function split(val) {
    return val.split("/");
}

// get the last directory entry in a path
function extractLast(val) {
    return split(val).pop();
}

// find the longest common start in an array of strings
function sharedStart(A) {
    var tem1, tem2, s;
    var res = "";

    if (A.length == 0) return res;

    A = A.slice(0).sort();
    tem1 = A[0];
    tem2 = A.pop();

    s = tem1.length;

    while (s > 0) {
        var m = tem1.substring(0, s);
        var re = new RegExp("^" + m + ".*", "i");

        if (tem2.match(re)) {
            res = m;
            break;
        }--s;
    }

    return res;
}

function acBindKey(event) {
    if (event.keyCode === $.ui.keyCode.TAB) {
    // get suggestion
        var sugg = $(this).siblings(".path.suggest").val();

    // accept current suggestion
        $(this).val(sugg);

    // trigger a new search with actual value
        $(this).autocomplete("search");

    // don't navigate away from the field on tab when selecting an item
        event.preventDefault();
    }
}

function acSource(request, response) {
    var path = split(request.term);
    var depth = path.length;
    var node = paths;
    var avail = new Array();

  // descent into the path tree to get a list of suggestions
    for (var n = 1; n < depth && typeof node !== "undefined"; n++) {
        var cur = path[n - 1];
        node = node[cur];
    }

  // build a regex with the last directory entry being typed
    var last = path.pop();
    var re = new RegExp("^" + last + ".*", "i");

  // filter suggestions by matching with the regex
    for (var k in node) {
        if (k.match(re)) avail.push(k);
    }

  // build a new suggestion
    path.push(sharedStart(avail));
    if (avail.length == 1) path.push("");

  // set suggestion for autocomplete
    var sugg = $(this.element).siblings(".path.suggest");
    $(sugg).val(path.join("/"));

  // delegate back to autocomplete, but extract the last term
    response($.ui.autocomplete.filter(avail, last));
}

function acSelect(event, ui) {
    var terms = split(this.value);

  // remove the current input
    terms.pop();

  // add the selected item
    terms.push(ui.item.value);
    terms.push("");

  // build path
    this.value = terms.join("/");

  // update suggestion
    $(this).siblings(".path.suggest").val(this.value);

    return false;
}

function acSearch() {
    $(this).autocomplete("search");
}

var acPathOptions = {
    minLength: 0,
    delay: 0,

    source: acSource,
    select: acSelect,

    focus: function () {
    // prevent value inserted on focus
        return false;
    }
}

function initPathAC(what) {
    $(what)
        .bind("keydown", acBindKey)
        .bind("focus", acSearch)
        .bind("click", acSearch)
        .autocomplete(acPathOptions)
        .autocomplete("enable");
}
