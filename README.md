# Convert links

Detect and convert links and email addresses to HTML hyperlinks sanely.

```js
convertLinks("The greatest page in the world is http://www.cwtsite.com I swear!")
// The greatest page in the world is <a href="http://www.cwtsite.com" target="_blank">http://www.cwtsite.com</a> I swear!
```

Add CSS classes to the link:

```js
convertLinks("http://www.cwtsite.com", ['with-style'])
// <a href="http://www.cwtsite.com" target="_blank" class="with-style">http://www.cwtsite.com</a>
```

## Tests

```
node test.js
```

