Lean Ux Prototype
-----------------

Coming to a web app near you...

Running the Application
------------------------

To launch the application:

    $ cd api
    $ node app

You should see node launch the application on port `3000` unless you override it on the shell or `export` a variable in `~/.bashrc or ~/.bash_profile`:

    $ PORT=5000 node app

The application should now be accessible via `http://localhost:3000`.

Running the Application with Supervisor
---------------------------------------

[Supervisor](https://github.com/isaacs/node-supervisor) is a handy command line utility that refreshes the application
if any source files change. Normally you have to reboot your server if you change any code, but with supervisor, you'll
get this out of the box. To install supervisor, execute the following:

    $ npm install supervisor -g

Then to run the application, execute:

    $ cd api
    $ supervisor app.js
