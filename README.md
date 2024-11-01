# PomoCLI

PomoCLI is a command-line interface (CLI) based Pomodoro Timer designed for developers. It helps you manage your work and break sessions efficiently using the Pomodoro Technique.

## Features

- Start a Pomodoro timer with customizable work and break durations.
- Configure default durations for work and break sessions.
- Receive desktop notifications when sessions are complete.
- Track total work time across sessions.

## Installation

To install PomoCLI, you need to have [Node.js](https://nodejs.org/) installed on your machine. Then, you can install the package globally using npm:
```
npm install -g pomocli
```

## Usage
### Start a Pomodoro Timer
To start a Pomodoro timer with default durations:
```
pomocli start
```

To specify custom durations for a session:
```
pomocli start --work 25 --break 5
```

### Configure Default Durations
To set default durations for work and break sessions:

```
pomocli config --work 25 --break 5
```

## Notifications
PomoCLI uses desktop notifications to alert you when a session is complete. You can choose to repeat the session or cancel it. Upon cancellation, the total work time will be displayed.

## Dependencies
yargs - Yargs helps you build interactive command line tools by parsing arguments and generating an elegant user interface.
node-notifier - A Node.js module for sending notifications on native Mac, Windows, and Linux (or Growl as fallback).
chalk - Terminal string styling done right.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Features Open for Contribution
- Save the total work time across sessions to a file.
- Add an option to track task names/IDs.
