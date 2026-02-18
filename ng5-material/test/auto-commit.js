const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, 'auto-commit-log.md');
const MAX_COMMITS = 30;

const header = '# Automated daily test-page commits\n\n';
let content = header;

if (fs.existsSync(LOG_PATH)) {
  content = fs.readFileSync(LOG_PATH, 'utf8');
  if (!content.startsWith('# ')) {
    content = `${header}${content}`;
  }
}

const lines = content
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => /^- \d{4}-\d{2}-\d{2}$/.test(line));

const uniqueDates = new Set(lines.map((line) => line.replace('- ', '')));

if (uniqueDates.size >= MAX_COMMITS) {
  console.log(`Reached ${MAX_COMMITS} commits. Nothing to do.`);
  process.exit(0);
}

const now = new Date();
const date = now.toISOString().slice(0, 10);

if (uniqueDates.has(date)) {
  console.log(`Entry for ${date} already exists. Nothing to do.`);
  process.exit(0);
}

const newContent = `${content.trimEnd()}\n- ${date}\n`;
fs.writeFileSync(LOG_PATH, newContent, 'utf8');
console.log(`Added ${date}. Total entries: ${uniqueDates.size + 1}/${MAX_COMMITS}`);
