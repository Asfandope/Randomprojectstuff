import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';

const path = './data.json';
const git = simpleGit();

// This function creates the commit
const markCommit = async (n) => {
    try {
        // Base case: If n is 0, we stop the loop and PUSH to GitHub
        if (n === 0) {
            console.log('All commits created! Pushing to GitHub...');
            await git.push();
            console.log('Successfully pushed to GitHub!');
            return;
        }

        // Calculate weeks from 2014 to now (approximately 10-11 years = ~520-570 weeks)
        // Using 570 weeks to cover from 2014 to 2025
        const totalWeeks = 570;
        const x = random.int(0, totalWeeks); // Random week from 2014 to now
        const y = random.int(0, 6); // Random day of week (0-6, where 0 is Sunday)

        // Calculate the date based on coordinates
        // Start from 2014-01-01 and add weeks and days
        const date = moment('2014-01-01')
            .add(x, 'w')      // Move forward x weeks from 2014
            .add(y, 'd')      // Move forward y days
            .format();

        const data = {
            date: date
        };

        if (n % 100 === 0) {
            console.log(`Progress: ${6500 - n} commits remaining. Creating commit for: ${date}`);
        }

        // Write the date to the json file
        await jsonfile.writeFile(path, data);
        
        // use simple-git to add and commit with the specific date
        await git.add([path]);
        await git.commit(date, { '--date': date });
        
        // Continue with next commit
        await markCommit(--n);
    } catch (error) {
        console.error(`Error creating commit: ${error.message}`);
        // Continue anyway to avoid stopping the entire process
        await markCommit(--n);
    }
};

// Start the process
// 6,500 commits over 11 years (2014-2025) = ~1.6 commits per day average
// This represents a realistic full-time open source developer's activity
console.log('Starting to create 6,500 commits from 2014 to 2025...');
markCommit(6500).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});

