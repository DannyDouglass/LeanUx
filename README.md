# Lean Ux Prototype

Coming to a web app near you...

* [REST API Bootstrap](https://github.com/DannyDouglass/LeanUx/blob/master/docs/api_bootstrap.md)
* [Mongo Db REST API](https://support.mongolab.com/entries/20433053-rest-api-for-mongodb)

# REST API/Server

The server is a REST API written in [node](http://nodejs.org/) that handles all database and external service communication.
It uses the [NO SQL Mongo Db database](http://www.mongodb.org/) for persistence/data access.

Running the Server
------------------

To launch the application:

    $ cd api
    $ node app

You should see node launch the application on port `3000` unless you override it on the shell or `export` a variable in `~/.bashrc or ~/.bash_profile`:

    $ PORT=5000 node app

The application should now be accessible via `http://localhost:3000`.

Running the Server with Supervisor
----------------------------------

[Supervisor](https://github.com/isaacs/node-supervisor) is a handy command line utility that refreshes the application
if any source files change. Normally you have to reboot your server if you change any code, but with supervisor, you'll
get this out of the box. To install supervisor, execute the following:

    $ npm install supervisor -g

Then to launch the server, execute:

    $ cd api
    $ supervisor app

Mongoose vs Native Driver
-------------------------

The server currently uses [mongoose](http://mongoosejs.com/) to interface with the target `mongodb` instance.
It's not as fast as the [native mongodb driver](http://docs.mongodb.org/ecosystem/drivers/node-js/), but it does provide a much more
convenient higher level DSL for communicating with `mongodb`. You can think of it as `NHibernate` vs `ADO.NET`.

Pushing Documents to the Cloud
------------------------------

The [Mongo Db REST API](https://support.mongolab.com/entries/20433053-rest-api-for-mongodb) allows us to script out
CRUD operations (amongst many others) against our instance in the cloud. For example, I added an address document by
issuing the following command:

    $ curl -v \
      -d "{ city: 'Arlington', state: 'Virginia', zipcode: 22202, street1: '109 Humphrey Ave', street2: 'Apt 19' }" \
      -H Content-Type:application/json \
      "https://api.mongolab.com/api/1/databases/leanux/collections/addresses?apiKey=<our_API_key_provided_by_mongolab>
