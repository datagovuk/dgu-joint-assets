module.exports = function(grunt) {
  path = require('path');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! VENDOR JS concatenated <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'assets/js/**/*.js',
        filter: function(filename) {
          /* Filter output filenames which start with "vendor" */
          var basename = path.basename(filename);
          if (!basename.match(/^vendor/)) {
            console.log(basename);
            return true;
          } 
          return false;
        },
        dest: 'assets/js/vendor.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! VENDOR JS minified <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'assets/js/vendor.js',
        dest: 'assets/js/vendor.compiled.js'
      }
    }
  });

  // load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify']);
};
