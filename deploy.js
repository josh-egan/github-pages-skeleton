#! /usr/bin/env node
"use strict"

var path = require('path');
var sh = require('shelljs')

var projectRoot = process.cwd();
var packageJson = require(path.resolve(projectRoot, 'package.json'));

var userConfig = packageJson['github-pages-deploy'] || {};
var config = {
  src: userConfig.src || 'gh-pages',
  outputLevel: getOutputLevel(userConfig.output),
  tempDir: userConfig.tempDir || '.publish',
  shouldFailIfUncommittedChanges: userConfig.shouldFailIfUncommittedChanges || true
};

function getOutputLevel(o) {
  switch (o) {
    case 'none':
    case 'quiet':
      return 0;
    case 'minimal':
    default:
      return 1;
    case 'commands':
      return 2;
    case 'verbose':
      return 3;
  }
}

function logToConsole(msg) {
  if (config.outputLevel >= 1)
    console.log(msg)
}

sh.config.verbose = config.outputLevel >= 2;
sh.config.silent = !(config.outputLevel >= 3);

if (config.shouldFailIfUncommittedChanges && sh.exec('git diff --exit-code && git diff --staged --exit-code').code !== 0)
  throw new Error('You have uncommitted changes! Please commit your files and then try again.')

sh.mkdir('-p', config.tempDir);
sh.cd(config.tempDir);

if (sh.ls('.git').code !== 0) {
  var remoteUrl = sh.exec('git config --get remote.origin.url').trim();
  sh.exec('git clone ' + remoteUrl + ' .');
}

var branches = sh.exec('git branch -a')
if (branches.indexOf('gh-pages') === -1)
  sh.exec('git branch gh-pages');
sh.exec('git checkout gh-pages');

var sourcePath = path.resolve(projectRoot, config.src, '*')
sh.exec('git rm -r .');
sh.cp('-R', sourcePath, '.');
sh.exec('git add -A .');

if (sh.exec('git diff --staged --exit-code').code === 0) {
  sh.exec('git reset --hard')
  logToConsole('Nothing to deploy - no changes detected.')
}
else {
  sh.exec('git commit -m "update gh-pages ' + new Date().toISOString() + '"');
  sh.exec('git push --set-upstream origin gh-pages');
  logToConsole('Successfully deployed to origin/gh-pages.')
}
