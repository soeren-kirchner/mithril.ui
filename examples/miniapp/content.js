var miniapp = function () {

    let showMenu = false

    const loadData = function(src) {
        fetch("data/" + src)
            .then(result => result.text())
            .then(text => document.getElementById("content").innerHTML = text)
        showMenu = false
    }

    return {
        view: function view () {
            return div(
                nav(
                    div("≡")
                        .class("sandwich")
                        .onclick(() => {showMenu = !showMenu}),
                    ul(
                        li("Albert Einstein")
                            .onclick(() => {loadData("einstein.html")}),
                        li("Boris Yakovlevich Podolsky")
                            .onclick(call(loadData, "podolsky.html")),
                        li("Nathan Rosen")
                            .onclick(call(loadData, "rosen.html")),
                    ).condClass({
                        "menu": showMenu,
                        "menu-hidden": !showMenu
                    })
                ),
                main("Choose from menu!").id("content"),
                footer(
                    a("mithril").href("https://mithril.js.org").target("_blank"),
                    a("mithril.ui").href("https://github.com/soeren-kirchner/mithril.ui").target("_blank"),
                )
            )
            .class("miniapp")
        },
    }
};

var root = document.body;
m.mount(root, miniapp);