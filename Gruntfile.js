/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

 
  // Project configuration.
  grunt.initConfig({
     
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * bati9999 copyright' +
            ' */\n',
    dest_dir: '../meboxp/assets/common',
    // Task configuration.
    clean: {
      assets: '<%= dest_dir %>'      
    },

    
	// task: build js: concat to dist
    concat: {
      options: {
        banner: '<%= banner %>\n',
        stripBanners: false
      },
      third: {
        src: [
		  'third_lib/jquery/dist/jquery.js',
          'third_lib/bootstrap/js/transition.js',
          'third_lib/bootstrap/js/alert.js',
          'third_lib/bootstrap/js/button.js',
          'third_lib/bootstrap/js/carousel.js',
          'third_lib/bootstrap/js/collapse.js',
          'third_lib/bootstrap/js/dropdown.js',
          'third_lib/bootstrap/js/modal.js',
          'third_lib/bootstrap/js/tooltip.js',
          'third_lib/bootstrap/js/popover.js',
          'third_lib/bootstrap/js/scrollspy.js',
          'third_lib/bootstrap/js/tab.js',
          'third_lib/bootstrap/js/affix.js'
		  
        ],
        dest: '<%= dest_dir %>/js/third.js'
      }
	},
	
	
    uglify: {
      options: {
        preserveComments: 'false'
      },
      third: {
        src: '<%= concat.third.dest %>',
        dest: '<%= dest_dir %>/js/third.min.js'
      }
	 
    },

    
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'style.css.map',
          sourceMapFilename: '<%= dest_dir %>/css/style.css.map'
        },
        src: 'less/style.less',
        dest: '<%= dest_dir %>/css/style.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: [
		  "Android 2.3",
		  "Android >= 4",
		  "Chrome >= 20",
		  "Firefox >= 24",
		  "Explorer >= 8",
		  "iOS >= 6",
		  "Opera >= 12",
		  "Safari >= 6"
        ],
      },
      core: {
        options: {
          map: true
        },
        src: '<%= dest_dir %>/css/style.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      minifyCore: {
        src: '<%= dest_dir %>/css/style.css',
        dest: '<%= dest_dir %>/css/style.min.css'
      }
    },

    copy: {
      fonts: {
	    expand:    true,
        cwd: 'third_lib/font-awesome/fonts/',
		src: '**',
        dest: '<%= dest_dir %>/fonts/',
		//filter: 'isFile'
      },
	  images: {
	    expand: true,
	    cwd: 'images/',
        src: '**',
        dest: '<%= dest_dir %>/images/',
		//filter: 'isFile'
      }
	}   
    }); 
   
    	
  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  
  // JS distribution task.
  grunt.registerTask('dist-js', ['concat:third','uglify:third']);
  grunt.registerTask('debug-js', ['concat:third']);
  

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core',  'cssmin:minifyCore']);
  grunt.registerTask('debug-css', ['less-compile', 'autoprefixer:core']);
  
  // Full distribution task.
  grunt.registerTask('dist', ['clean:assets', 'dist-css', 'copy:images','copy:fonts', 'dist-js']);
  grunt.registerTask('debug', ['clean:assets', 'debug-css', 'copy:fonts', 'copy:images','debug-js']);

  // Default task.
  grunt.registerTask('default', ['clean:assets', 'dist-css', 'copy:fonts','copy:images', 'dist-js']);

 
};
