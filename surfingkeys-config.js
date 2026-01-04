// Surfingkeys configuration - vulcan-mode edition
// Last updated: January 2026
// Controls: Ctrl+A = select all, Alt+0 = home, Alt+4 = end in insert mode

// Disable default Ctrl+A (go to beginning of line)
api.iunmap('<Ctrl-a>');

// Ctrl+A → Select all text in input/textarea/contenteditable
//api.imapkey('<Ctrl-a>', '#15Select all in current input', function() {
//  var input = document.activeElement;
//    if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA' || input.isContentEditable)) {
//        input.select();
//    }
//});

// Alt+0 → Move cursor to beginning of line
api.imapkey('<Alt-0>', '#15Move cursor to beginning of line', function() {
    var input = document.activeElement;
    if (input && input.setSelectionRange) {
        input.setSelectionRange(0, 0);
        input.focus();
    } else if (input && input.isContentEditable) {
        var sel = window.getSelection();
        sel.collapse(input.firstChild || input, 0);
    }
});

// Alt+4 → Move cursor to end of line
api.imapkey('<Alt-4>', '#15Move cursor to end of line', function() {
    var input = document.activeElement;
    if (input && input.setSelectionRange) {
        input.setSelectionRange(input.value.length, input.value.length);
        input.focus();
    } else if (input && input.isContentEditable) {
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(input);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
});

// ← Add more custom mappings, themes, search aliases, etc. here
// Examples:
// settings.theme = 'dark';  // or your preferred theme
// api.mapkey('F', 'Hints in new tab', 'Hints("F")');
