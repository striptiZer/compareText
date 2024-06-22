var oldValues = "";
let iA = "#txtBoxA", iB = "#txtBoxB", AO = "#txtAOnly", BO = "#txtBOnly", AnB = "#txtAnB", AuB = "#txtAuB";

function countLines(t, i, n) {
    var o = $(t).val().split(/\r|\r\n|\n/), c = (o = o.map((function (t) {
        return t.trim()
    }))).filter((function (t) {
        return"" !== t
    }));
    $(i).text(c.length);
    var e = countDupes(c);
    $(n).text(e)
}

function countDupes(t) {
    var i = t.reduce((function (t, i) {
        return t[i] = (t[i] || 0) + 1, t
    }), {}), n = 0;
    for (var o in i)
        i[o] > 1 && n++;
    return n
}

function countDupes(arr) {
    var counts = arr.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});
    return Object.values(counts).filter(count => count > 1).length;
}


function recount(t) {
    switch (t) {
        case iA:
            countLines(t, "#linesA", "#dupesA");
            break;
        case iB:
            countLines(t, "#linesB", "#dupesB");
            break;
        case AO:
            countLines(t, "#linesAOnly", "#dupeslinesAOnly");
            break;
        case BO:
            countLines(t, "#linesBOnly", "#dupeslinesBOnly");
            break;
        case AnB:
            countLines(t, "#linesAnB", "#dupeslinesAnB");
            break;
        case AuB:
            countLines(t, "#linesAuB", "#dupeslinesAuB")
    }
}

function actionBox(t, i) {
    let n = $(i).val();
    n = n.replace(/\n$/, "");
    let o = n.split(/[\r\n]+/), c = [];
    switch (t) {
        case"reverse":
            o.reverse(), c = o.join("\r\n");
            break;
        case"sort":
            o.sort(), c = o.join("\r\n");
            break;
        default:
            o = o.map((t => t.trim())), o = o.filter((t => "" != t)), c = [...new Set(o)].join("\r\n")
    }
    $(i).val(c), recount(i)
}

function copyLBtoClipboard(t) {
    var i = new Clipboard(t);
    i.on("success", (function (t) {})), i.on("error", (function (t) {}))
}

function splitRow(t, i) {
    for (var n = [], o = "", c = !1, e = null, r = !1, l = null, u = 0; u < t.length; u++) {
        var s = t[u];
        r ? (o += '"' === s || "'" === s ? s : "\\" + s, r = !1) : "\\" === s ? (c && (o += s), r = !0) : '"' === s || "'" === s ? (c ? s === e && "\\" !== l && (c = !1, e = null) : (e = s, c = !0), o += s) : !c && i.test(s) ? (n.push(o), o = "") : o += s, l = s
    }
    return n.push(o), n
}

function splitCSV(t) {
    for (var i = $(t).val(), n = new Set, o = i.split(/\r?\n/), c = 0; c < o.length; c++)
        if ("" !== o[c].trim())
            for (var e = splitRow(o[c], /[,;:\t]/), r = 0; r < e.length; r++)
                n.add(e[r].trim());
    var l = Array.from(n).join("\n");
    $(t).val(l), $(t).trigger("change")
}

$(document).ready((function () {
    $('[data-toggle="tooltip"]').tooltip(), $("#btnConfig").click((function () {
        "none" == $("#ldConfig").css("display") ? $("input:hidden#configView").val("block") : $("input:hidden#configView").val("none"), $("#ldConfig").slideToggle(800), $("#btnConfig").tooltip("hide");
        "none" == $("#ldHelp").css("display") ? $("input:hidden#configView").val("block") : $("input:hidden#configView").val("none"), $("#ldHelp").slideToggle(800), $("#btnHelp").tooltip("hide");
    })), $("#LDSwitcher").click((function () {
        $(".LDSwitch").toggleClass("col-md-6"), $(".LDSwitch2").toggleClass("col-md-4"), $(".LDSwitch2").hasClass("col-md-4") ? $("#adDiv1").insertBefore("#adDiv2") : $("#adDiv2").insertBefore("#adDiv1"), $(".LDTextArea").attr("rows", (function (t, i) {
            return 20 == i ? 10 : 20
        })), "computer" === $(this).text() ? $(this).text("desktop_windows") : $(this).text("computer")
    })), recount(iA), recount(iB), $("#mvB2A").click((function () {
        let t = $(iB).val();
        $(iA).val(t), $(iB).val(""), recount(iA), recount(iB)
    })), $("#mvA2B").click((function () {
        let t = $(iA).val();
        $(iB).val(t), $(iA).val(""), recount(iA), recount(iB)
    })), $("#binA").click((function () {
        $(iA).val(""), recount(iA)
    })), $("#binB").click((function () {
        $(iB).val(""), recount(iB)
    })), $("#splitA").click((function () {
        splitCSV(iA), actionBox("trimDupes", iA)
    })), $("#trimA").click((function () {
        actionBox("trimDupes", iA)
    })), $("#reverseA").click((function () {
        actionBox("reverse", iA)
    })), $("#sortA").click((function () {
        actionBox("sort", iA)
    })), $("#splitB").click((function () {
        splitCSV(iB), actionBox("trimDupes", iB)
    })), $("#trimB").click((function () {
        actionBox("trimDupes", iB)
    })), $("#reverseB").click((function () {
        actionBox("reverse", iB)
    })), $("#sortB").click((function () {
        actionBox("sort", iB)
    })), $("#reverseAO").click((function () {
        actionBox("reverse", AO)
    })), $("#sortAO").click((function () {
        actionBox("sort", AO)
    })), $("#trimAO").click((function () {
        actionBox("trimDupes", AO)
    })), $("#reverseBO").click((function () {
        actionBox("reverse", BO)
    })), $("#sortBO").click((function () {
        actionBox("sort", BO)
    })), $("#trimBO").click((function () {
        actionBox("trimDupes", BO)
    })), $("#reverseAnB").click((function () {
        actionBox("reverse", AnB)
    })), $("#sortAnB").click((function () {
        actionBox("sort", AnB)
    })), $("#trimAnB").click((function () {
        actionBox("trimDupes", AnB)
    })), $("#reverseAuB").click((function () {
        actionBox("reverse", AuB)
    })), $("#sortAuB").click((function () {
        actionBox("sort", AuB)
    })), $("#trimAuB").click((function () {
        actionBox("trimDupes", AuB)
    })), $("#txtBoxA, #txtBoxB, #txtAOnly, #txtBOnly, #txtAnB, #txtAuB").on("change keyup paste click", (function () {
        var t = $(this).val();
        t != oldValues && (oldValues = t, recount("#" + this.id))
    }))



    // Highlight the menu clicked
    $(document).on('click', '.nav li', function (e) {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $(".btn").click(function (event) {
        $(this).blur();  // Removes button focus
    });

    $(".dropdown").on("show.bs.dropdown", function (e) {
        var linkText = $(e.relatedTarget).text(); // Get the link text
    });



    // Compare lists.
    $("#submit").click(function (event) {
        // Read options.
        console.log("Options:");
        console.log("Case sesitive: " + $("#caseSen").val());
        console.log("Ignore begin and end spaces: " + $("#caseSen").val());
        console.log("Ignore extra spaces: " + $("#caseSen").val());
        console.log("Ignore leading zeroes: " + $("#caseSen").val());
        console.log("Line numbered: " + $("#caseSen").val());
        console.log("Sort option: " + $("#sortOption").val());
        console.log("Case change: " + $("#caseChange").val());
        
        // Copy txtBoxA and txtBoxB content to result lists.
        let listA = $("#txtBoxA").val();
        let listB = $("#txtBoxB").val();
        $("#txtAOnly").val(listA + "\n" + listB);
        $("#txtAnB").val(listA + "\n" + listB);
        $("#txtBOnly").val(listA + "\n" + listB);
        $("#txtAuB").val(listA + "\n" + listB);
    });
}));











class ListComparator {
    constructor() {
        this.caseInsensitive = false;
        this.ignoreBeginAndEndSpaces = false;
        this.ignoreExtraSpaces = false;
        this.ignoreLeadingZeroes = false;
        this.addLineNumber = false;
        this.caseChange = 'no-case';

        this.onlyInA = [];
        this.onlyInB = [];
        this.inBoth = [];
        this.inEither = [];
    }

    setCaseInsensitive(value) {
        this.caseInsensitive = value;
    }

    setIgnoreBeginAndEndSpaces(value) {
        this.ignoreBeginAndEndSpaces = value;
    }

    setIgnoreExtraSpaces(value) {
        this.ignoreExtraSpaces = value;
    }

    setIgnoreLeadingZeroes(value) {
        this.ignoreLeadingZeroes = value;
    }

    setAddLineNumber(value) {
        this.addLineNumber = value;
    }

    setCaseChange(value) {
        this.caseChange = value;
    }

    compareLists(listA, listB) {
        listA = this.prepareList(listA);
        listB = this.prepareList(listB);

        this.onlyInA = listA.filter(x => !listB.includes(x));
        this.onlyInB = listB.filter(x => !listA.includes(x));
        this.inEither = [...this.onlyInA, ...this.onlyInB];
        this.inBoth = [...listA, ...listB].filter(x => !this.inEither.includes(x));
    }

    prepareList(list) {
        return list.map(x => {
            if (this.ignoreBeginAndEndSpaces) x = x.trim();
            if (this.ignoreExtraSpaces) x = x.replace(/\s+/g, ' ');
            if (this.ignoreLeadingZeroes) x = x.replace(/^0+/g, '');
            return this.caseInsensitive ? x.toLowerCase() : x;
        });
    }

    formatList(list) {
        list = list.map(x => {
            if (this.caseChange === 'capitalize') x = x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
            if (this.caseChange === 'upper') x = x.toUpperCase();
            if (this.caseChange === 'lower') x = x.toLowerCase();
            return x;
        });
        if (this.addLineNumber) {
            list = list.map((x, i) => `${i + 1}. ${x}`);
        }
        return list;
    }

    formatList(list, sortOption) {
        list = list.map(x => {
            if (this.caseChange === 'capitalize') x = x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
            if (this.caseChange === 'upper') x = x.toUpperCase();
            if (this.caseChange === 'lower') x = x.toLowerCase();
            return x;
        });
    
        if (sortOption === 'az') {
            list.sort((a, b) => a.localeCompare(b));
        } else if (sortOption === 'za') {
            list.sort((a, b) => b.localeCompare(a));
        }
    
        if (this.addLineNumber) {
            list = list.map((x, i) => `${i + 1}. ${x}`);
        }
        return list;
    }
}

$(document).ready(function () {
    $('#submit').on('click', function () {
        var listA = [...$('#txtBoxA').val().split('\n').filter(line => line !== '')];
        var listB = [...$('#txtBoxB').val().split('\n').filter(line => line !== '')];

        var comparator = new ListComparator();

        if ($('#caseSen').is(':checked')) {
            comparator.setCaseInsensitive(true);
        }
        if ($('#ignoreSpace').is(':checked')) {
            comparator.setIgnoreBeginAndEndSpaces(true);
        }
        if ($('#ignoreExtra').is(':checked')) {
            comparator.setIgnoreExtraSpaces(true);
        }
        if ($('#ignoreZero').is(':checked')) {
            comparator.setIgnoreLeadingZeroes(true);
        }
        if ($('#linenumbered').is(':checked')) {
            comparator.setAddLineNumber(true);
        }

        // Handle case change option
        var caseChange = $('#caseChange').val();
        comparator.setCaseChange(caseChange);

        comparator.compareLists(listA, listB);

        // Place results in textareas
        $('#txtAOnly').val(comparator.formatList(comparator.onlyInA).join('\n'));
        $('#txtAnB').val(comparator.formatList(comparator.inBoth).join('\n'));
        $('#txtBOnly').val(comparator.formatList(comparator.onlyInB).join('\n'));
        $('#txtAuB').val(comparator.formatList(comparator.inEither).join('\n'));

        // Update line counts
        $('#linesAOnly').text(comparator.onlyInA.length);
        $('#linesAnB').text(comparator.inBoth.length);
        $('#linesBOnly').text(comparator.onlyInB.length);
        $('#linesAuB').text(comparator.inEither.length);

        // Update duplicate counts
        $('#dupeslinesAOnly').text(countDupes(comparator.onlyInA));
        $('#dupeslinesAnB').text(countDupes(comparator.inBoth));
        $('#dupeslinesBOnly').text(countDupes(comparator.onlyInB));
        $('#dupeslinesAuB').text(countDupes(comparator.inEither));

        var sortOption = $('#sortOption').val();

$('#txtAOnly').val(comparator.formatList(comparator.onlyInA, sortOption).join('\n'));
$('#txtAnB').val(comparator.formatList(comparator.inBoth, sortOption).join('\n'));
$('#txtBOnly').val(comparator.formatList(comparator.onlyInB, sortOption).join('\n'));
$('#txtAuB').val(comparator.formatList(comparator.inEither, sortOption).join('\n'));
    });
});





