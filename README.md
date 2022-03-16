# mithril.ui

is a kind of extension to the modern and sophisticated [Mithril](https://mithril.js.org) Framework.

A typical mithril sample looks like this:

```js
var root = document.body
var count = 0 // added a variable

var Hello = {
	view: function() {
		return m("main", [
			m("h1", {
				class: "title"
			}, "My first app"),
			m("button", {
				onclick: function() {count++}
			}, count + " clicks")
		])
	}
}

m.mount(root, Hello)
```

With mithril.ui you can write it as follows

```js
var root = document.body
var count = 0 // added a variable

var Hello = {
    view: function() {
        return main(
            h1("My first App")
                .class("title"),
            button(count + " clicks")
                .onclick(function() {count++})
        )
    }
}

m.mount(root, Hello)
```

