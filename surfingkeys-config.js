api.imap('<Alt-a>', '<Ctrl-a>');
api.iunmap('<Ctrl-a>');
api.map('e', 'd');

// Tab navigation
api.mapkey('<Ctrl-Alt-ArrowLeft>', '#3Go to left tab', function() {
    api.Normal.feedkeys('E');
});
api.mapkey('<Ctrl-Alt-ArrowRight>', '#3Go to right tab', function() {
    api.Normal.feedkeys('R');
});

