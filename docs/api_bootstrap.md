Initial Setup
------------

Below are some of the steps web took to get the application setup for development.

Git
---

Setup application structure and created repository:

    $ LeanUx git:(master) tree -d -L 2
    .
    ├── docs
    └── src
        ├── api
        └── web

Downloaded [git ignore for node.js](https://github.com/github/gitignore/blob/master/Node.gitignore).

Express Boilerplate
-------------------

To create the node applications default directory structure, execute:

    $ cd src
    $ express api

This generates a folder named `api` under the current working directory and adds boilerplate setup
files needed to run a sample application.

Configuring Dependencies
------------------------

Any libraries required to run the application should can be configured via `api/package.json`. Normally the jade
view engine is included by default, but since we're using node.js solely for the purposes of persistence and
data retrieval, it is no longer required. The `api\public` folder generated via:

    $ express api

and any middleware associated with it have also been removed.

Installing Dependencies
-----------------------

All dependencies are installed in the `api/node_modules` directory. This directory is not tracked by git (exlcuded via `.gitignore`)
as packages can dynamically be installed via `npm`:

    $ cd api
    $ npm install
    ├── methods@0.0.1
    ├── fresh@0.1.0
    ├── range-parser@0.0.4
    ├── cookie-signature@0.0.1
    ├── buffer-crc32@0.1.1
    ├── cookie@0.0.5
    ├── commander@0.6.1
    ├── debug@0.7.2
    ├── mkdirp@0.3.3
    ├── send@0.1.0 (mime@1.2.6)
    └── connect@2.7.2

Keep Your Node and NPM Installs Up to Date
------------------------------------------

As packages are added and upgraded, they'll require a higher version of the
`node` runtime. You won't be able to install these packages if your `node` or `npm`
installs are out of date. We recommend installing the [homebrew package manager](http://mxcl.github.com/homebrew/)
to manage `node` and `npm`.

If you already have `homebrew` installed, run:

    $ brew update
    $ brew upgrade

The first command, `brew update`, will update `homebrew` itself and pull down
new formula definitions. The second command, `brew upgrade [FORMULA]`, will upgrade all
out of date formulas to their latest version. See `brew help` for more
options.

Running the Application
------------------------

To launch the application:

    $ cd api
    $ node app

You should see node launch the application on port `3000` unless you override it on the shell or `export` a variable in `~/.bashrc or ~/.bash_profile`:

    $ PORT=5000 node app

The application should now be accessible via `http://localhost:3000`.
