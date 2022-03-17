var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib.js
var lib_exports = {};
__export(lib_exports, {
  default: () => init
});
module.exports = __toCommonJS(lib_exports);
var elements = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
var events = ["onmouseover", "onclick", "onload", "style", "id", "active", "title", "disabled", "href", "src", "alt", "target"];
function cls(def, separator = " ") {
  let classes;
  for (const cls2 in def) {
    if (def[cls2]) {
      classes = classes == null ? cls2 : classes + separator + cls2;
    }
  }
  return classes || "";
}
function init(target, m) {
  target.call = function call(...args) {
    return () => {
      args[0](...args.slice(1));
    };
  };
  for (const element of elements) {
    const tag = function(...children) {
      const inner = function(elementName, ...children2) {
        const args = Array.from(children2);
        const f = m(elementName, ...args);
        const attrs = f.attrs;
        const arg = attrs == null ? args : args.slice(1);
        f.sel = function(selector) {
          return inner(elementName, { ...attrs, ...m(selector).attrs }, ...arg);
        };
        f.class = function(classname) {
          return inner(elementName, { ...attrs, className: classname }, ...arg);
        };
        f.attr = function(code) {
          return inner(elementName, { ...attrs, ...code }, ...arg);
        };
        f.cls = (clsObj) => inner(elementName, { ...attrs, className: cls(clsObj) }, ...arg);
        f.condClass = f.cls;
        for (const event of events) {
          f[event] = function(code) {
            return inner(elementName, { ...attrs, [event]: code }, ...arg);
          };
        }
        return f;
      };
      return inner(element, children);
    };
    target[element] = tag;
  }
}
