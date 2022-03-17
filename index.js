// taken from https://github.com/sindresorhus/html-tags
// prettier-ignore
const elements = [ "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"]
// prettier-ignore
const events = ["onmouseover", "onclick", "onload", "style", "id", "active", "title", "disabled", "href", "src", "alt", "target"]

function cls(def, separator = " ") {
    let classes
    for (const cls in def) {
        if (def[cls]) {
            classes = classes == null ? cls : classes + separator + cls
        }
    }
    return classes || ""
}

function call(...args) {
    return () => {
        args[0](...args.slice(1))
    }
}

for (const element of elements) {
    const tag = function (...children) {
        const inner = function (elementName, ...children) {
            const args = Array.from(children)
            const f = m(elementName, ...args)
            const attrs = f.attrs
            const arg = attrs == null ? args : args.slice(1)
            f.sel = function (selector) {
                return inner(
                    elementName,
                    { ...attrs, ...m(selector).attrs },
                    ...arg
                )
            }
            f.class = function (classname) {
                return inner(
                    elementName,
                    { ...attrs, className: classname },
                    ...arg
                )
            }
            f.attr = function (code) {
                return inner(elementName, { ...attrs, ...code }, ...arg)
            }
            f.cls = (clsObj) =>
                inner(elementName, { ...attrs, className: cls(clsObj) }, ...arg)
            f.condClass = f.cls
            for (const event of events) {
                f[event] = function (code) {
                    return inner(
                        elementName,
                        { ...attrs, [event]: code },
                        ...arg
                    )
                }
            }
            return f
        }
        return inner(element, children)
    }

    window[element] = tag
}
