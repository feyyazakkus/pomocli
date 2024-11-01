#!/usr/bin/env node
const yargs = require('yargs');
const notifier = require('node-notifier');
const path = require('path');
const chalk = require('chalk');

const {loadConfig, saveConfig} = require('./config');

// totals
let totalWorkTime = 0;

const startTimer = (duration, sessionType, callback) => {
    const durationMilliseconds = duration * 60 * 1000;
    let message = `Work session complete! Time for a break.`

    if (sessionType == 'break') {
        message = 'Break time over! Ready to work again?'
    }

    setTimeout(() => {
        notifier.notify({
            title: 'PomoCLI',
            message: message,
            icon: path.join(__dirname, 'logo-100px.png'), 
            actions: sessionType == 'break' ? ['Repeat', 'Cancel'] : null
        });

        if (sessionType == 'work') {
            console.log(chalk.green(message));
        } else {
            console.log(chalk.blue(message));
        }

        if (typeof callback === 'function') callback();

    }, durationMilliseconds);
};

const startPomodoro = (argv) => {
    const workMinutes = argv.work;
    const breakMinutes = argv.break;
    totalWorkTime += workMinutes;

    console.log(chalk.yellow(`Starting Pomodoro: ${workMinutes} minutes of work, ${breakMinutes} minutes of break`));

    startTimer(workMinutes, 'work', () => {
      startTimer(breakMinutes, 'break');
    });
};


// Start command to run Pomodoro timer
yargs.command({
    command: 'start',
    describe: 'Start a Pomodoro timer',
    builder: {
        work: {
            alias: 'w',
            description: 'Work duration in minutes',
            type: 'number',
            default: loadConfig().work,
        },
        break: {
            alias: 'b',
            description: 'Break duration in minutes',
            type: 'number',
            default: loadConfig().break,
        }
    },
    handler(argv) {
        startPomodoro(argv);
    }
});

// Config command to set default work and break durations
yargs.command({
    command: 'config',
    describe: 'Set default Pomodoro configuration',
    builder: {
        work: {
            alias: 'w',
            description: 'Default work duration in minutes',
            type: 'number',
            demandOption: true,
        },
        break: {
            alias: 'b',
            description: 'Default break duration in minutes',
            type: 'number',
            demandOption: true,
        }
    },
    handler(argv) {
        const newConfig = { work: argv.work, break: argv.break };
        saveConfig(newConfig);
    }
});

// Parse arguments
const argv = yargs.help().alias('help', 'h').argv;

// Notification action listeners (lower-case):
notifier.on('repeat', () => {
    startPomodoro(argv);
});
notifier.on('cancel', () => {
    console.log(chalk.bold('Total work time: ') + chalk.bold.red(`${totalWorkTime} minutes`));
    process.exit(0);
});
