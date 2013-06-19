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
        src: [
          'assets/js/jquery-ui-1.10.2.custom.js',
          'assets/js/underscore-1.1.6.js',
          'assets/js/backbone-0.5.1.js',
          'assets/js/modernizr-2.6.2.custom.js',
          'assets/js/spin.min.js',
          'assets/js/json2.js',
          'assets/js/jquery.tmpl.beta1.js',
          'assets/js/jquery.cookie.min.js',
          'assets/js/jquery.chosen-0.9.7.js',
          'assets/js/jquery.dotdotdot-1.5.9.js',
          'assets/js/jquery.placeholder.js',
          'assets/js/bootstrap-2.0.3.min.js',
          'assets/js/bootstrap-hashchange.js'
        ],
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
      original: {
        src: 'assets/css/dgu-joint.less',
        dest: 'assets/css/dgu-joint.compiled.css'
      },
      responsive: {
        src: 'assets/css/dgu-responsive.less',
        dest: 'assets/css/dgu-responsive.min.css'
      }
    },
    watch: {
      lessresponsive: {
        files: 'assets/css/**.less',
        tasks: 'less:responsive'
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify','less','timestamp']);
};
