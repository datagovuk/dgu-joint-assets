# (1) Installation

We store a central repository of shared CSS and Javascript assets. This is to improve performance of the site and to deduplicate certain efforts, as well as to ease development of the theme.

They are stored in [dgu-joint-assets](http://github.com/datagovuk/dgu-joint-assets), which contains `/assets/`. This must be served by any DGU web server under `http://...servername.../assets`.

Shared files include:

* Stylesheets (combined and minified):
  * Twitter Bootstrap 2.0.3
  * jQueryUI 1.10.2 (customised with DGU colour flavours)
  * jQuery Chosen 0.9.7 
  * dgu-joint, a core set of styles for common UI elements
* Javascript:
  * Backbone 0.5.1
  * Bootstrap 2.0.3 (for tooltips etc)
    * Bootstrap hashchange plugin (for switching tabs in a page using document.hash)
  * **NOT jQuery**, as different pages currently use different versions
  * jQuery Chosen 0.9.7
  * jQuery cookies
  * jQuery placeholders
  * jQuery tmpl
  * jQuery UI 1.10.2
  * json2.js
  * modernizr 1.7
  * spin.js
  * underscore 1.1.6
* **Resulting compiled files:**
  * /assets/css/dgu-joint.compiled.css
  * /assets/js/vendor.compiled.js

### Installation: CKAN side

* Clone [dgu-joint-assets](http://github.com/datagovuk/dgu-joint-assets) in your `src/` folder alongside `src/ckanext-dgu/`.

This magically works because [there is a symlink](https://github.com/datagovuk/ckanext-dgu/blob/master/ckanext/dgu/theme/public/assets) installed in `src/ckanext-dgu/ckanext/dgu/theme/public/` linking to `../../../../../dgu-joint-assets/assets`, so the folder is shared along with everything else in `public`.

### Installation: Through Apache (eg. Drupal developers)

* Clone the [dgu-joint-assets](http://github.com/datagovuk/dgu-joint-assets) repo somewhere on your machine. Eg. zephod's is at `~/code/dgu-joint-assets/`.
* Update your Apache configuration to share the `~/code/dgu-joint-assets/assets` folder on the local webserver as `/assets/`.

Eg. Except from `co-dev1:/etc/apache2/sites-available/dgu.common`:

    # CKAN Cached resources
    Alias /assets /home/co/dgu-joint-assets/assets/
    <Directory /home/co/dgu-joint-assets/assets/>
            FileETag MTime Size
            Options FollowSymLinks MultiViews
            AllowOverride All
            Order allow,deny
            allow from all
    </Directory>

### Installation: In Production

Follow the Apache instructions as above. The repo is cloned in `~/dgu-joint-assets` and the config matches the above.

# (2) Developing CSS

This is [Less CSS](http://lesscss.org/), a superset of CSS which eases a great deal of the pain in theme development. The trade-off is that it introduces a precompilation step, which handles error checking, mixins, minification etc.

* Execute `./watch_css`, a node.js script which monitors changes in the LESS files.
* This automatically overwrites `assets/css/dgu-joint.compiled.less` as you modify LESS code.
* Commit, push, pull as normal.

The compiler only processes `.less` files, hence stupid file renames like `jquery.chosen.css.less`.

# (3) Developing JS

These are vendor libraries, so mainly we'll want to add/remove files from the compiled set. 

* Add/remove files from `assets/js/`
* Update whitelist in node script `./compile_vendor_js`. 
* Wince slightly while doing so, but sagely understand that there are legacy reasons why this is a node script, and you're welcome to rewrite it.
* Execute `./compile_vendor_js`.
* This overwrites `assets/js/vendor.compiled.js`. Including error checking and minification.
* Commit, push pull as normal.


