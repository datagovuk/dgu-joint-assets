We store a central repository of shared CSS and Javascript assets for the Drupal and CKAN servers. This is to improve performance of the site and to deduplicate certain efforts, as well as to ease development of the theme on data.gov.uk.

# INSTALLATION

We use [gruntjs](http://gruntjs.com) which requires just a couple of lines of installation.

 Remove any old version

    sudo npm uninstall -g grunt

Install Grunt CLI tools globally.

    sudo npm install -g grunt-cli

Install local project dependancies (eg. JS minifiers etc).

    cd dgu-joint-assets
    npm install

# RECOMPILATION

* Update the Stylesheets (written in [Less](http://lesscss.org), a superset of the CSS language) and execute `grunt` to overwrite the compiled CSS file.
* Add or remove vendor JS files from `assets/js/`. Files in here are automatically discovered.

When changes are made, recompile everything by just executing:

    grunt

Use `grunt --help` to see a list of all available tasks. For example:

    grunt concat
    grunt uglify

# INTEGRATION

The Drupal and CKAN servers depend upon this repository being available. When setting up a web server, ensure that the `assets` folder is being served live at `http://...servername.../assets`. 

CKAN makes this easy by serving up a symlink in the `public/` folder. Just clone this repository alongside `ckan`, `ckanext-dgu` etc.

### Installation: Through Apache (Drupal servers, production systems etc):

* Clone the [dgu-joint-assets](http://github.com/datagovuk/dgu-joint-assets) repo somewhere on your machine. Eg. zephod's is at `~/code/dgu-joint-assets/`.
* Update your Apache configuration to share the `~/code/dgu-joint-assets/assets` folder on the local webserver as `/assets/`.

Eg. Excerpt from `co-dev1:/etc/apache2/sites-available/dgu.common`:

    # CKAN Cached resources
    Alias /assets /home/co/dgu-joint-assets/assets/
    <Directory /home/co/dgu-joint-assets/assets/>
            FileETag MTime Size
            Options FollowSymLinks MultiViews
            AllowOverride All
            Order allow,deny
            allow from all
    </Directory>

# CONTENTS

Shared files include:

* Stylesheets (combined and minified):
  * Twitter Bootstrap 2.0.3
  * jQueryUI 1.10.2 (customised with DGU colour flavours)
  * jQuery Chosen 0.9.7 
  * dgu-joint, a core set of styles for common UI elements
* Javascript:
  * Everything in `assets/js` (automatically discovered)
  * Backbone 0.5.1
  * Bootstrap 2.0.3 (for tooltips etc)
    * Bootstrap hashchange plugin (for switching tabs in a page using document.hash)
  * **NOT jQuery**, as different pages currently use different versions
  * jQuery plugins: Chosen 0.9.7, cookies, placeholders, tmpl, dotdotdot 1.5.9, UI 1.10.9
  * json2.js
  * modernizr 1.7
  * spin.js
  * underscore 1.1.6
* **Resulting compiled files:**
  * /assets/css/dgu-joint.compiled.css
  * /assets/js/vendor.compiled.js
