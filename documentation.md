## Elements




## Modifiers


## Comparison to the mithril m()-Syntax

### Mithril m()-Syntax
```js
m("ul", { id: "b" }, [ 
    m("li", "hello"), 
    m("li", "world"), 
])  
```
### mithril.ui
```js
ul(
    li("hello"),
    li("world")
).id("b")
```

## Special Modifiers

### .sel()

Mithril supports complex CSS selector syntax like this:

```js
m("a#exit.external[href='https://example.com']", "Leave")
// <a id="exit" class="external" href="https://example.com">Leave</a>
```
With mithril.ui you can use it with the .sel() modifier:
```js
a("Leave").sel("#exit.external[href='https://example.com']")
```
 
### .attr()



