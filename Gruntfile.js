/*!
 * Gruntfile for SharePoint 2013 developer bookmarklets
 * Mark Bice <mbice@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

module.exports = function (grunt) {

    /**
     * Load required Grunt tasks.
     */
    grunt.loadNpmTasks('grunt-bookmarklet-thingy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    /**
     * Task configuration
     */
    var taskConfig = {
		counter: 0,
		
        dirs: {
            build: 'bin',
            src: 'src'
        },
		
        files: {
            src: ['<%= dirs.src %>/**/*.js']
        },

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            bookmarklet: '<%= dirs.build %>/*'
        },

        jshint: {
            src: [
                    '<%= dirs.src %>/*.js'
            ],
            gruntfile: [
                    'Gruntfile.js'
            ],
            options: {
                ignores: ['/**/*.min.js'],
                curly: true,
                immed: true,
                newcap: false,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                multistr: true,
                scripturl: true,
                smarttabs: true,
                '-W099': true,
                loopfunc: true
            }
        },

        bookmarklet: {
            generate: {
                amdify: false,
                timestamp: false,
				jshint: false
            }
        }
    };
	
    grunt.initConfig(taskConfig);


    /**
     * Register custom task for creating our bookmarklets
     */
	grunt.registerTask('createBookmarklets', function() {
		var files = grunt.file.expand(grunt.config('files.src'));

		for (var i = 0; i < files.length; i++) {
			grunt.task.run(['incrementCurrentBookmarklet', 'bookmarklet']);
		}
	});
	
	
	/**
	* Increments a counter and sets bookmarklet config to current bookmarklet in our source array
	*/
	grunt.registerTask('incrementCurrentBookmarklet', '', function() {
		var srcFolder = grunt.config('dirs.src'),
			outFolder = grunt.config('dirs.build'),
			counter = parseInt(grunt.config.get('counter')),
			files = grunt.file.expand(grunt.config('files.src')),
			file =  files[counter];
		
		grunt.config('bookmarklet.generate.body', file);
		grunt.config('bookmarklet.generate.out', file.replace('.js', '.bookmarklet.js').replace(srcFolder, outFolder));
		
		grunt.config('counter', counter+1);
	});
	
	 
    grunt.registerTask('bookmark', [
		'clean:bookmarklet', 'jshint', 'createBookmarklets'
    ]);

	
    grunt.registerTask('default', [
		'bookmark'
    ]);
};