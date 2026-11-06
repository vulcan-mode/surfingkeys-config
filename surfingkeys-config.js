// Disabled on monovoz.com and its subdomains
settings.blocklistPattern = /^https?:\/\/([^\/]+\.)?monovoz\.com(?=[:\/?#]|$)/i;

api.imap('<Alt-a>', '<Ctrl-a>');
api.iunmap('<Ctrl-a>');
api.map('e', 'd');

// Tab navigation
api.map('<Ctrl-Alt-ArrowLeft>', 'E');
api.map('<Ctrl-Alt-ArrowRight>', 'R');

