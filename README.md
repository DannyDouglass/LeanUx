# Lean Ux Prototype

An expirement on implementing a new application architecture focused on flexibility, performance, and ability to deliver to multiple devices/platforms.

## Getting Started

**Note**: Only Mac-based setup documented at this time

After downloading the source, follow these instructions to get up and running locally:

1. [Install Prerequisites](##1-install-prerequisites)
2. [Download NPM Dependencies](#2-download-npm-dependencies) 
3. [Running the API Node.js Server](#3-running-the-api-server)

### 1. Install Prerequisites
----------------------------

You can download these in a variety of ways, but the recommend path is provided below:

**First Install** [Homebrew](https://github.com/mxcl/homebrew/wiki/Installation) and then run the following commands:

	$ brew install node
	$ brew install npm
	$ npm install -g requirejs bower

### 2. Download NPM Dependencies
--------------------------------------

#### API
All dependencies are installed in the `api/node_modules` directory. This directory is not tracked by git (exlcuded via `.gitignore`)
as packages can dynamically be installed via `npm` from the root of the LeanUx repository:
	
	$ npm install
   
Read more about
[Keeping your dependencies up to date](https://github.com/DannyDouglass/LeanUx/blob/master/docs/api_bootstrap.md) in the API Documentation

### 3. Running the API Server
-----------------------------

To launch the application:

[Supervisor](https://github.com/isaacs/node-supervisor) is a handy command line utility that refreshes the application if any source files change. Normally you have to reboot your server if you change any code, but with supervisor, you'll get this out of the box. To install supervisor, execute the following:

    $ npm install supervisor -g

Then to launch the server, execute:

    $ cd bin
    $ ./supervisor.sh

Open a browser and go to [http://localhost:3000/app/index.htm](http://localhost:3000/app/index.htm) and you are set!

The API can be access via a browser by going to http://localhost:3000/newhire/{YOUR_ROUTE}

**NOTE:** You can execute the script from any directory. It knows how to locate
it's current directory and resolve all paths relative to that location.

If you check the contents of `supervisor.sh`, you'll notice it's watching the
entire `app` directory for changes. It will restart the application if any
file changes in any folder under `api`. For example, `routes`, `models`, etc.

## More Information

* Web Tier Documentation (TODO)
* API Tier Documentation (TODO)