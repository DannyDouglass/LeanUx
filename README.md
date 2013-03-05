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

Populating Sample Data
----------------------

We've set up a really convenient convention based mechanism for adding sample
data to the database. Lets say you're working with a `Car`. On the server,
you'll have:

    var db = require('../lib/db');

    var CarSchema = new db.Schema({
      year    : { type: Number },
      make    : { type: String },
      model   : { type: String }
    });

And on the client, you've got something to the affect of:

    var Car = Backbone.Model.extend({

      initialize: function() { ... },

    });

To populate data for this model:

    $ cd api/seeds
    $ echo '{ year: 1999, make: "Chevy", model: "Caprice" }' > cars.json

Now you've got a seed that we'll plant in the cloud for you. Notice that the
name of the seed file is the plural form of the model. This is by convention
and conforms to the expectations of `Mongo Db` in that your collections names
are the pluralized form of your model name. So for a `Book` model, your seed
file should be named `books.json`. Make sense? Perfect...

If you'd like to push multiple documents, just use and array in your seed file:

    $ [ {doc1...} {doc2}...{doc3}...{docn} ]

Once you're got your seed file in place:

    $ cd api/bin
    $ ./dataload.sh

`dataload.sh` is a convenient shell script that will kindly plant all your
seeds in the cloud. Of course when I say "plant" and "seed", I mean it's going to create a
collection for you and stuff some documents in it. Don't worry if the
collection doesn't exist and you're running the script for the first time.
`Mongo` will politely take care this for you as it will automatically create any
collection that does not already exist.

You can run `dataload.sh` as many times as you like. It performs both setup
and teardown per invocation.

Happy farming...:+1: 
