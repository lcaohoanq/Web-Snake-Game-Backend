#!/usr/bin/env node

// The above line is called as shebang, which to tell system to run this file using node

/*
The `npm link` command is used to create a symbolic link in the global node_modules directory that links to the package where the `npm link` command was executed. This is useful for installing your own packages, or for testing out other packages.

In your case, you have defined a `bin` property in your `package.json` file, which maps command names to local file names. When you run `npm link`, npm will create a symbolic link between the command name and the specified file. This allows you to run the file from anywhere on your system using the command name, as if it were a globally installed command.

Without running `npm link`, the command you've defined in the `bin` property would not be recognized by your system, because it doesn't know where to find the associated file. By running `npm link`, you're effectively telling your system "when I run this command, here's the file I want you to execute".
*/

// Code to count length of word
// passed as argument

// Receive argument via command line
const word = process.argv[2];

// Counting length
const length = word.length;

// Printing it to console
console.log(`Word : ${word}`);
console.log(`Words Length : ${length}`);
