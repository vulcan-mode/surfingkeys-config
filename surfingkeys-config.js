api.iunmap("<Ctrl-a>");

// yd → Open current tab URL in a new tab (duplicate)
api.mapkey("yd", "#3Open current tab in a new tab", function () {
  window.open(window.location.href, "_blank");
});

// Alt-0 → Move cursor to very beginning of entire text input
api.imapkey(
  "<Alt-0>",
  "#15Move cursor to very beginning of text input",
  function () {
    var input = document.activeElement;
    if (!input) return;

    if (input.setSelectionRange) {
      // Handles <input> and <textarea>
      input.setSelectionRange(0, 0);
      input.focus();
    } else if (input.isContentEditable) {
      // Handles contentEditable div/span etc.
      input.focus();
      var sel = window.getSelection();
      var range = document.createRange();
      range.setStart(input, 0);
      range.setEnd(input, 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  },
);

// Alt-4 → Move cursor to very end of entire text input
api.imapkey("<Alt-4>", "#15Move cursor to very end of text input", function () {
  var input = document.activeElement;
  if (!input) return;

  if (input.setSelectionRange) {
    // Handles <input> and <textarea>
    var len = input.value.length;
    input.setSelectionRange(len, len);
    input.focus();
  } else if (input.isContentEditable) {
    // Handles contentEditable div/span etc.
    input.focus();
    var sel = window.getSelection();
    var range = document.createRange();
    var childCount = input.childNodes.length;
    if (childCount > 0) {
      range.setStartAfter(input.childNodes[childCount - 1]);
    } else {
      range.setStart(input, 0);
    }
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
});
