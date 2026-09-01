const fs = require('fs');
let content = fs.readFileSync('js/m.js', 'utf8');

// Remove bell icon
content = content.replace(/<i class="fa fa-bell" aria-hidden="true"><\/i>\s*/g, '');

// Remove question mark icon
content = content.replace(/<i class="fa fa-question-circle" aria-hidden="true"><\/i>/g, '');

// Remove nodong.kr links but keep inner text
// Match <a href="...nodong.kr..." ...>...</a>
// Be careful with nested tags if any, but regex usually works for simple cases.
// Actually it's easier to just use a non-greedy match.
content = content.replace(/<a[^>]*href="https:\/\/www\.nodong\.kr[^>]*>(.*?)<\/a>/g, '');

// Also remove <i class="fa fa-external-link"></i> that are left behind
content = content.replace(/<i aria-hidden="true" class="fa fa-external-link"><\/i>/g, '');
content = content.replace(/<i aria-hidden="true" class="fa fa-external-link" style="margin-left:5px"><\/i>/g, '');

fs.writeFileSync('js/m.js', content, 'utf8');
console.log('Fixed m.js');
