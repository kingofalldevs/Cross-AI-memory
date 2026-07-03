const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const regex = /<script>([\s\S]*?)<\/script>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    try {
        new Function(match[1]);
    } catch (e) {
        console.error("Syntax Error found!", e.message);
        const lines = match[1].split('\n');
        lines.forEach((l, i) => console.log(`${i+1}: ${l}`));
        process.exit(1);
    }
}
console.log("No syntax errors found.");
