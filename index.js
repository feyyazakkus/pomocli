#!/usr/bin/env node
const yargs = require('yargs');
const notifier = require('node-notifier');
const path = require('path');

const argv = yargs
    .option('work', {
        alias: 'w',
        description: 'Work duration in minutes',
        type: 'number',
        default: 25,
    })
    .option('break', {
        alias: 'b',
        description: 'Break duration in minutes',
        type: 'number',
        default: 5,
    })
    .help()
    .alias('help', 'h')
    .argv;

const startTimer = (duration, sessionType, callback) => {
    const message = sessionType == 'work' ? 'Work session' : 'Break time';

    console.log(`Starting ${message} for ${duration} minutes...`);

    setTimeout(() => {
        notifier.notify({
            title: 'PomoCLI',
            message: `Time's up! ${message} completed.`,
            icon: path.join(__dirname, 'logo-100px.png'), 
            actions: sessionType == 'break' ? ['Repeat', 'Cancel'] : null
        });
        console.log(`Time's up! ${message} completed`);

        if (typeof callback === 'function') callback();
        
    }, duration * 60 * 1000);
};

// totals
let totalWorkTime = 0;

const startPomodoro = () => {
    const workDuration = argv.work;
    const breakDuration = argv.break;

    totalWorkTime += workDuration;
  
    startTimer(workDuration, 'work', () => {
      startTimer(breakDuration, 'break');
    });
};

// Buttons actions (lower-case):
notifier.on('repeat', () => {
    startPomodoro();
});
notifier.on('cancel', () => {
    console.log(`Total work time: ${totalWorkTime} minutes`);
    process.exit(0);
});

startPomodoro();
