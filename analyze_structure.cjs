
const fs = require('fs');
const path = require('path');

const dir = 'src/assets/facilities';
const files = fs.readdirSync(dir).filter(f => f.match(/^DSC\d+/));

const data = files.map(f => {
    const match = f.match(/DSC(\d+)/);
    const stats = fs.statSync(path.join(dir, f));
    return {
        filename: f,
        num: parseInt(match[1]),
        time: stats.mtime
    };
}).sort((a, b) => a.num - b.num);

console.log(`Total files: ${data.length}`);

let groups = [];
let currentGroup = [data[0]];
let lastNum = data[0].num;
let lastTime = data[0].time;

// Lower threshold to 20
const NUM_THRESHOLD = 20;
// Time threshold (milliseconds) - e.g. 5 minutes break
const TIME_THRESHOLD = 5 * 60 * 1000;

for (let i = 1; i < data.length; i++) {
    const numDiff = data[i].num - lastNum;
    const timeDiff = data[i].time - lastTime;

    // Check if significant gap in numbering OR time
    if (numDiff > NUM_THRESHOLD || timeDiff > TIME_THRESHOLD) {
        groups.push(currentGroup);
        currentGroup = [];
        console.log(`Break detected after ${lastNum} (diff: ${numDiff}, time: ${timeDiff / 1000}s)`);
    }
    currentGroup.push(data[i]);
    lastNum = data[i].num;
    lastTime = data[i].time;
}
groups.push(currentGroup);

console.log(`Identified ${groups.length} groups.`);
groups.forEach((g, i) => {
    const groupName = `Area_${String(i + 1).padStart(2, '0')}`;
    const groupDir = path.join(dir, groupName);

    console.log(`Creating ${groupName} with ${g.length} photos...`);

    if (!fs.existsSync(groupDir)) {
        fs.mkdirSync(groupDir);
    }

    g.forEach(fileData => {
        const oldPath = path.join(dir, fileData.filename);
        const newPath = path.join(groupDir, fileData.filename);
        fs.renameSync(oldPath, newPath);
    });
});
