# SurfingKeys API Reference

All APIs are accessed via the global `api` object (e.g., `api.map`, `api.mapkey`).

## Key Mapping

### api.map(new_keystroke, old_keystroke, domain?, new_annotation?)
Remap a key sequence to another in **normal mode**.
```js
api.map(';d', '<Ctrl-Alt-d>');
api.map('e', 'd'); // remap 'e' to do what 'd' does
```

### api.unmap(keystroke, domain?)
Remove a key mapping in normal mode.
```js
api.unmap("<<", /youtube.com/);
```

### api.unmapAllExcept(keystrokes[], domain?)
Unmap all keybindings except those specified.
```js
api.unmapAllExcept(['E','R','T'], /google.com|twitter.com/);
```

### api.imap(new_keystroke, old_keystroke, domain?, new_annotation?)
Map a key sequence in **insert mode**.
```js
api.imap('<Alt-a>', '<Ctrl-a>');
```

### api.iunmap(keystroke, domain?)
Unmap a key sequence in insert mode.

### api.cmap(new_keystroke, old_keystroke, domain?, new_annotation?)
Map a key sequence in **omnibar**.

### api.vmap(new_keystroke, old_keystroke, domain?, new_annotation?)
Map a key sequence in **visual mode**.

### api.vunmap(keystroke, domain?)
Unmap a key sequence in visual mode.

### api.lmap(new_keystroke, old_keystroke, domain?, new_annotation?)
Map a key sequence in **lurk mode**.

### api.mapkey(keys, annotation, jscode, options?)
Create a shortcut in **normal mode** to execute custom JavaScript.
- `keys`: key sequence string
- `annotation`: help message shown in `?` help
- `jscode`: function to execute (if it needs an arg, next keypress is fed to it)
- `options`: `{domain: /regex/i, repeatIgnore: bool}`
```js
api.mapkey("<Space>", "pause/resume on youtube", function() {
    var btn = document.querySelector("button.ytp-play-button");
    btn.click();
}, {domain: /youtube.com/i});
```

### api.vmapkey(keys, annotation, jscode, options?)
Like mapkey but for **visual mode**.

### api.imapkey(keys, annotation, jscode, options?)
Like mapkey but for **insert mode**.

## Search Aliases

### api.addSearchAlias(alias, prompt, search_url, search_leader_key?, suggestion_url?, callback_to_parse_suggestion?, only_this_site_key?, options?)
Add a search engine to the omnibar.
- `alias`: trigger key(s)
- `prompt`: caption in omnibar
- `search_url`: URL with query placeholder
- `search_leader_key`: default `s` — `s<alias>` searches selected text
- `suggestion_url`: URL for autocomplete suggestions
- `callback_to_parse_suggestion`: function to parse suggestion response
- `only_this_site_key`: default `o` — `so<alias>` searches within current site
- `options`: `{favicon_url, skipMaps}`
```js
api.addSearchAlias('d', 'duckduckgo', 'https://duckduckgo.com/?q=', 's',
  'https://duckduckgo.com/ac/?q=', function(response) {
    var res = JSON.parse(response.text);
    return res.map(r => r.phrase);
  });
```

### api.removeSearchAlias(alias, search_leader_key?, only_this_site_key?)
Remove a search engine alias.

### api.searchSelectedWith(se, onlyThisSite?, interactive?, alias?)
Search selected text with a given search engine URL.

## Clipboard

### api.Clipboard.read(onReady)
Read from clipboard. Callback receives `{data: string}`.

### api.Clipboard.write(text)
Write text to clipboard.

## Hints

### api.Hints.setNumeric()
Use digits as hint labels (allows typing text to filter links).

### api.Hints.setCharacters(characters)
Set characters for generating hints.
```js
api.Hints.setCharacters("asdgqwertzxcvb");
```

### api.Hints.create(cssSelector, onHintKey, attrs?)
Create hints for elements matching the selector.
- `attrs`: `{active, tabbed, multipleHits}`
```js
api.mapkey('yA', '#7Copy a link URL to the clipboard', function() {
    api.Hints.create('*[href]', function(element) {
        api.Clipboard.write('[' + element.innerText + '](' + element.href + ')');
    });
});
```

### api.Hints.click(links, force?)
Click element or create hints for elements to click.

### api.Hints.dispatchMouseClick(element)
Default onHintKey implementation — dispatches a mouse click.

### api.Hints.style(css, mode?)
Set styles for hints. Use `mode: "text"` for visual mode hints.

## Normal Mode

### api.Normal.passThrough(timeout?)
Enter PassThrough mode (ignores SurfingKeys until Escape or timeout).

### api.Normal.scroll(type)
Scroll: `down | up | pageDown | fullPageDown | pageUp | fullPageUp | top | bottom | left | right | leftmost | rightmost | byRatio`

### api.Normal.feedkeys(keys)
Feed keys into Normal mode.

### api.Normal.jumpVIMark(mark)
Jump to a vim-like mark.

## Visual Mode

### api.Visual.style(element, style)
Set styles for visual mode elements (`marks` or `cursor`).

## Front (UI)

### api.Front.showEditor(element, onWrite, type?, useNeovim?)
Launch the vim editor.
```js
api.mapkey(';U', '#4Edit current URL with vim editor', function() {
    api.Front.showEditor(window.location.href, function(data) {
        window.location.href = data;
    }, 'url');
});
```

### api.Front.openOmnibar(args)
Open omnibar. Types: `Bookmarks, AddBookmark, History, URLs, RecentlyClosed, TabURLs, Tabs, Windows, VIMarks, SearchEngine, Commands, OmniQuery, UserURLs`

### api.Front.showBanner(msg, timeout?)
Show a banner message (default 1600ms).

### api.Front.showPopup(msg)
Show a popup message.

### api.Front.registerInlineQuery(args)
Register an inline query with a dictionary service.

## ACE Editor

### api.aceVimMap(lhs, rhs, ctx)
Map keys in the ACE vim editor. `ctx`: `insert` or `normal`.

### api.addVimMapKey(objects)
Add detailed key maps in ACE editor.

## Utility

### api.RUNTIME(action, args, callback)
Call a background action.
```js
api.RUNTIME('getTabs', {queryInfo: {currentWindow: true}}, response => {
  console.log(response);
});
```

### api.getBrowserName()
Returns `"Chrome" | "Firefox" | "Safari"`.

### api.isElementPartiallyInViewport(el, ignoreSize?)
Check if an element is in viewport.

### api.getClickableElements(selectorString, pattern)
Get clickable elements by CSS selector and/or text pattern.

### api.getLargeElements(minWidth?, minHeight?)
Get large visible elements (defaults: 30% of viewport).

### api.tabOpenLink(str, simultaneousness?)
Open links in new tabs (split by `\n`).

## Settings

Common settings (set via `settings.propertyName`):
- `settings.scrollStepSize` (default 70) — pixels per j/k scroll
- `settings.scrollFriction` (default 0) — force needed for continuous scrolling
- `settings.hintAlign` ("left" | "center" | "right", default "center")
- `settings.hintExplicit` (default false) — wait for explicit input with single hint
- `settings.omnibarPosition` ("middle" | "bottom")
- `settings.focusFirstCandidate` — auto-focus first omnibar result
- `settings.aceKeybindings` ("vim" | "emacs")
- `settings.nextLinkRegex` — regex for "next page" link detection
- `settings.prevLinkRegex` — regex for "previous page" link detection
- `settings.blocklistPattern` — regex to disable SurfingKeys on matching URLs
- `settings.theme` — custom CSS theme string

## Key Notation
- `<Ctrl-x>` — Ctrl + x
- `<Alt-x>` — Alt + x
- `<Meta-x>` — Meta/Super + x
- `<Shift-x>` — Shift + x (only needed for special keys)
- `<ArrowUp>`, `<ArrowDown>`, `<ArrowLeft>`, `<ArrowRight>`
- `<Enter>`, `<Escape>`, `<Tab>`, `<Backspace>`, `<Space>`

## Default Normal Mode Keys (partial list)
| Key | Action |
|-----|--------|
| `?` | Show help |
| `j/k` | Scroll down/up |
| `h/l` | Scroll left/right |
| `gg/G` | Scroll to top/bottom |
| `d/u` | Half page down/up |
| `e/E` | Scroll half page up / Switch to previous tab |
| `R` | Reload page |
| `f` | Open link in current tab (hints) |
| `F` | Open link in new tab (hints) |
| `gf` | Open link in non-active new tab |
| `C` | Open link in new tab (multi-hit) |
| `i` | Enter insert mode |
| `v` | Enter visual mode |
| `T` | Choose a tab |
| `t` | Open URL / search |
| `b` | Open bookmark |
| `o` | Open URL / history / bookmark |
| `S/D` | Go back/forward in history |
| `r` | Reload page |
| `x` | Close current tab |
| `X` | Restore closed tab |
| `W` | Move tab to new window |
| `>>` / `<<` | Move tab right/left |
| `yt` | Duplicate tab |
| `yy` | Copy current URL |
| `yi` | Copy image URL |
| `ya` | Copy page title + URL |
| `gi` | Focus first input |
| `;j` | Close downloads bar |
| `gx0` | Close all tabs to the left |
| `gxt` | Close tab on right |
| `gxT` | Close tab on left |
| `gx$` | Close all tabs to the right |
| `on` | Open new tab |
| `B` | Go back one tab in history |
| `m` + char | Set mark |
| `'` + char | Jump to mark |
