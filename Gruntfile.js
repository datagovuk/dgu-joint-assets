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
    },
    less: {
      options: {
        banner: '/* dgu-less compiled <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        yuicompress: true
      },
      build: {
        src: 'assets/css/dgu-joint.less',
        dest: 'assets/css/dgu-joint.compiled.css'
      }
    },
    timestamp: {
      build: {
        dest: 'assets/timestamp'
      }
    }
  });

  grunt.registerMultiTask('timestamp', 'Write timestamp to a file', function(myName, myTargets) {
    grunt.file.write(this.files[0].dest, Date.now());
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify','less','timestamp']);
};
