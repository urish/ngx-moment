# Contributing Guide

Contributing to `angular2-moment` is fairly easy. This document shows you how to
get the project, run all provided tests and generate a production ready build.

It also covers provided npm scripts, that help you developing on `angular2-moment`.

## Dependencies

To make sure, that the following instructions work, please install the following dependencies
on you machine:

- Node.js
- npm
- Git

## Installation

To get the source of `angular2-moment` clone the git repository via:

`git clone https://github.com/urish/angular2-moment`

This will clone the complete source to your local machine. Navigate to the project folder
and install all needed dependencies via **npm**:

`npm install`

Well done! angular2-moment is now installed and ready to be built.

## Building

`angular2-moment` comes with a few **npm scripts** which help you to automate
the development process. The following npm scripts are provided:

#### npm test

`npm test` compiles the typescript code into javascript, and then runs the unit
tests, which are located in `src/*.spec.ts`. The task uses the **karma** test 
runner to executes the tests with the **jasmine testing framework**. 

#### npm run prepublish

`npm run prepublish` compiles the typescript code into javascript.

## Contributing/Submitting changes

- Checkout a new branch based on `master` and name it to what you intend to do:
  - Example:
    ````
    $ git checkout -b BRANCH_NAME
    ````
  - Use one branch per fix/feature
- Make your changes
  - Make sure to provide a spec for unit tests (see [time-ago.pipe.spec.ts](src/time-ago.pipe.spec.ts) for example)
  - Run your tests with `npm test`
  - When all tests pass, everything's fine
- Commit your changes
  - Please provide a git message which explains what you've done
  - Commit to the forked repository
- Make a pull request

If you follow these instructions, your PR will land pretty safely in the main repo!
