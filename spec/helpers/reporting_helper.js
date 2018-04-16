'use strict';

const reporters = require('jasmine-reporters');
const JasmineConsoleReporter = require('jasmine-console-reporter');

jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
    savePath: 'results',
    consolidateAll: true
}));
jasmine.getEnv().addReporter(new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: true,
    emoji: true,         // boolean or emoji-map object
    beep: true
}));