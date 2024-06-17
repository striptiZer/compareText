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

function recount(t) {
    switch (t) {
        case iA:
            countLines(t, "#linesA", "#dupesA");
            break;
        case iB:
            countLines(t, "#linesB", "#dupesB");
            break;
        case AO:
            countLines(t, "#linesAOnly", "");
            break;
        case BO:
            countLines(t, "#linesBOnly", "");
            break;
        case AnB:
            countLines(t, "#linesAnB", "");
            break;
        case AuB:
            countLines(t, "#linesAuB", "")
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
        
        // Copy list A and list B content to result lists.
        let listA = $("#txtBoxA").val();
        let listB = $("#txtBoxB").val();
        $("#txtAOnly").val(listA + "\n" + listB);
        $("#txtAnB").val(listA + "\n" + listB);
        $("#txtBOnly").val(listA + "\n" + listB);
        $("#txtAuB").val(listA + "\n" + listB);
    });
}));















$(document).ready(function() {
    $('#submit').on('click', function() {
        var listA = $('#txtBoxA').val().split('\n');
        var listB = $('#txtBoxB').val().split('\n');

        // Apply checkboxes
        if (!$('#caseSen').is(':checked')) {
            listA = listA.map(line => line.toLowerCase());
            listB = listB.map(line => line.toLowerCase());
        }
        if ($('#ignoreSpace').is(':checked')) {
            listA = listA.map(line => line.trim());
            listB = listB.map(line => line.trim());
        }
        if ($('#ignoreExtra').is(':checked')) {
            listA = listA.map(line => line.replace(/\s+/g, ' '));
            listB = listB.map(line => line.replace(/\s+/g, ' '));
        }
        if ($('#ignoreZero').is(':checked')) {
            listA = listA.map(line => line.replace(/^0+/, ''));
            listB = listB.map(line => line.replace(/^0+/, ''));
        }


        // Remove empty lines
        listA = listA.filter(line => line !== '');
        listB = listB.filter(line => line !== '');

        // Find unique and common elements
        var setA = new Set(listA);
        var setB = new Set(listB);

        var aOnly = listA.filter(line => !setB.has(line));
        var bOnly = listB.filter(line => !setA.has(line));
        var anB = listA.filter(line => setB.has(line));
        var auB = [...new Set([...listA, ...listB])];

        // Apply sorting
        var sortOption = $('#sortOption').val();
        if (sortOption === 'az') {
            aOnly.sort();
            bOnly.sort();
            anB.sort();
            auB.sort();
        } else if (sortOption === 'za') {
            aOnly.sort().reverse();
            bOnly.sort().reverse();
            anB.sort().reverse();
            auB.sort().reverse();
        }

        // Apply case change
        var caseChangeOption = $('#caseChange').val();
        if (caseChangeOption === 'capitalize') {
            aOnly = aOnly.map(line => line.charAt(0).toUpperCase() + line.slice(1).toLowerCase());
            bOnly = bOnly.map(line => line.charAt(0).toUpperCase() + line.slice(1).toLowerCase());
            anB = anB.map(line => line.charAt(0).toUpperCase() + line.slice(1).toLowerCase());
            auB = auB.map(line => line.charAt(0).toUpperCase() + line.slice(1).toLowerCase());
        } else if (caseChangeOption === 'upper') {
            aOnly = aOnly.map(line => line.toUpperCase());
            bOnly = bOnly.map(line => line.toUpperCase());
            anB = anB.map(line => line.toUpperCase());
            auB = auB.map(line => line.toUpperCase());
        } else if (caseChangeOption === 'lower') {
            aOnly = aOnly.map(line => line.toLowerCase());
            bOnly = bOnly.map(line => line.toLowerCase());
            anB = anB.map(line => line.toLowerCase());
            auB = auB.map(line => line.toLowerCase());
        }      

        // Apply numbering if Line Numbered is checked
        if ($('#lineNum').is(':checked')) {
            aOnly = aOnly.map((line, index) => `${index + 1}. ${line}`);
        }

        if ($('#lineNum').is(':checked')) {
            anB = anB.map((line, index) => `${index + 1}. ${line}`);
        }

        if ($('#lineNum').is(':checked')) {
            bOnly = bOnly.map((line, index) => `${index + 1}. ${line}`);
        }

        if ($('#lineNum').is(':checked')) {
            auB = auB.map((line, index) => `${index + 1}. ${line}`);
        }

        // Place results in textareas
        $('#txtAOnly').val(aOnly.join('\n'));
        $('#txtAnB').val(anB.join('\n'));
        $('#txtBOnly').val(bOnly.join('\n'));
        $('#txtAuB').val(auB.join('\n'));

        // Update line counts
        $('#linesAOnly').text(aOnly.length);
        $('#linesAnB').text(anB.length);
        $('#linesBOnly').text(bOnly.length);
        $('#linesAuB').text(auB.length);
    });
});