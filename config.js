const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// Path to the config file
const configPath = path.join(__dirname, 'config.json');

// Function to load configuration
function loadConfig() {
    if (fs.existsSync(configPath)) {
        const configFile = fs.readFileSync(configPath);
        return JSON.parse(configFile);
    }
    // Default configuration
    return { work: 25, break: 5 };
}

// Function to save configuration
function saveConfig(newConfig) {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    console.log(chalk.green('Configuration saved successfully.'));
}

module.exports = { loadConfig, saveConfig };
