# Lean Ux Prototype

An expirement on implementing a new application architecture focused on flexibility, performance, and ability to deliver to multiple devices/platforms.

## Getting Started

**Note**: Only Mac-based setup documented at this time

After downloading the source, follow these instructions to get up and running locally:

1. [Install Prerequisites](##1-install-prerequisites)
2. [Execute commands to download dependencies in Web and API layers](#2-download-web--api-dependencies) 
3. [Configure local sites](#3-configure-local-sites)
4. [Running the API Node.js Server](#4-running-the-api-server)

### 1. Install Prerequisites
----------------------------

You can download these in a variety of ways, but the recommend path is provided below:

**First Install** [Homebrew](https://github.com/mxcl/homebrew/wiki/Installation) and then run the following commands:

	$ brew install node
	$ brew install npm
	$ npm install -g requirejs bower

### 2. Download Web & API Dependencies
--------------------------------------

#### Web
[Bower](https://github.com/twitter/bower) is used to manage the dependencies in the Web tier.  You can download all web dependencies by running the following commands (*from the root of the LeanUx/src directory*):
 
	$ cd src/web
	$ bower install

The first line simply permits exection of the script, while the second executes the bower install process

#### API
All dependencies are installed in the `api/node_modules` directory. This directory is not tracked by git (exlcuded via `.gitignore`)
as packages can dynamically be installed via `npm`:
	
	$ cd api
	$ npm install
   
Read more about
[Keeping your dependencies up to date](https://github.com/DannyDouglass/LeanUx/blob/master/docs/api_bootstrap.md) in the API Documentation

### 3. Configure Local Sites
----------------------------

Edit your hosts file:

	$ sudo nano -w /etc/hosts

Add the following line to the bottom:

	127.0.0.1	leanux.local
	
Then create a virtual host in your local Apache instance by adding the following to `/etc/apache2/httpd.conf` via the command line as in the previous step.  

**Be sure to change the {PATH_TO_YOUR_LEANUX_CLONE} to match your local path**:

	<VirtualHost *:80>
    	ServerName leanux.local
    	DocumentRoot /{PATH_TO_YOUR_LEANUX_CLONE}/public/app
    	DirectoryIndex index.htm
    	ErrorLog /var/log/apache2/leanux.local-error_log
    	TransferLog /var/log/apache2/leanux.local-access_log

    	ProxyRequests Off

    	<Proxy *>
        	Order deny,allow
        	Allow from all
    	</Proxy>

    	<Location /api>
        	ProxyPass http://localhost:3000
        	ProxyPassReverse http://localhost:3000
    	</Location>
	</VirtualHost>
	
Then start Apache:

	$ sudo apachectl start
	
**To launch Apache at startup:**

	sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist
	
Verify that Apache is listening for connections on port 80:

	$ sudo lsof -iTCP:80 -sTCP:LISTEN
	
Verify that you can pull up `http://leanux.local/index.htm`.

Also verify that you can access `http://leanux.local/api/employeeProfiles`. If you get a "503 - Service Temporarily Unavailable" error, make sure node is running and listening on port 3000.

### 4. Running the API Server
-----------------------------

To launch the application:

    $ cd api/bin
    $ ./node.sh

**NOTE:** You can execute the script from any directory. It knows how to locate
it's current directory and resolve all paths relative to that location.

The application should now be accessible via `http://localhost:3000`.

##### Or…Run the API w/ Supervisor
[Supervisor](https://github.com/isaacs/node-supervisor) is a handy command line utility that refreshes the application if any source files change. Normally you have to reboot your server if you change any code, but with supervisor, you'll get this out of the box. To install supervisor, execute the following:

    $ npm install supervisor -g

Then to launch the server, execute:

    $ cd api/bin
    $ ./supervisor.sh

**NOTE:** You can execute the script from any directory. It knows how to locate
it's current directory and resolve all paths relative to that location.

If you check the contents of `supervisor.sh`, you'll notice it's watching the
entire `app` directory for changes. It will restart the application if any
file changes in any folder under `api`. For example, `routes`, `models`, etc.

## More Information

* Web Tier Documentation (TODO)
* API Tier Documentation (TODO)
