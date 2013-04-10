

# Create `/var/www/current/public_html/sites/all/themes/dgu4/css/joint-ckan-drupal.css`
    cd /var/www/current/public_html/sites/all/themes/dgu4/css
    sudo ln -s ~/dgu-joint-assets/joint-ckan-drupal.css .
    sudo chown -h jenkins joint-ckan-drupal.css
    sudo chgrp -h nogroup joint-ckan-drupal.css
  

# Update `/var/www/current/public_html/sites/all/themes/dgu4/dgu4.info`

Add `css/joint-ckan-drupal.css` under stylesheets, before `dgu.css`
See: `dgu4.info.diff`


# Update `/var/www/current/public_html/sites/all/themes/dgu4/css/dgu.css`

Have a look at the diff: `dgu.css.diff`


# Update `/var/www/current/public_html/sites/all/themes/dgu4/page.tpl.php`

Have a look at the diff: `page.tpl.diff`


# Clear the CSS cache

Under Performance, click 'Clear Cache'.


