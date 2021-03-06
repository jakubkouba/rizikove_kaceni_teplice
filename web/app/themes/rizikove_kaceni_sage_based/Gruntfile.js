/*global module:false*/

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            css_banner: '/*\n' +
            'Theme Name: Rizikove kaceni teplice based on Sage base wordpress theme' +
            'Author: Jakub Adler\n' +
            '*/\n',
            sass_assets_dir:    'assets/styles',
            js_assets_dir:      'assets/scripts',
            css_dest:           'dist/styles/main.css',
            js_dest:            'dist/scripts/main.js',
            fonts_dest:         'dist/fonts/'
        },
        sass: {
            options:{
              lineNumbers: true
            },
            main: {
                files: {
                   '<%= meta.css_dest %>': '<%= meta.sass_assets_dir %>/main.scss'
                }
            }
        },
        cssmin: {
            main: {
                options: {
                    banner: '<%= meta.css_banner %>'
                },
                files: {
                    '<%= meta.css_dest %>': '<%= meta.css_dest %>'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    // jQuery
                    jQuery: true,
                    // extras
                    alert: true,
                    console: true,
                    require: true,
                    $: true,
                    module: true,
                    _ : true,
                    google: true,
                    Mustache: true
                }
            },
            all: [
                'Gruntfile.js',
                '<%= meta.js_assets_dir %>/**/*.js'
            ]
        },
        browserify: {
            "app": {
                files: { '<%= meta.js_dest %>': ['<%= meta.js_assets_dir %>/main.js'] }
            }
        },
        uglify: {
            main: {
                files: { '<%= meta.js_dest %>': '<%= meta.js_dest %>' }
            }
        },
        copy: {
            main:{
                expand: true,
                cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/',
                src: '*',
                dest: '<%= meta.fonts_dest %>'
            },
            images:{
                expand: true,
                cwd: 'assets/images/',
                src: '*',
                dest: 'dist/styles/images/'
            },
            videos:{
                expand: true,
                cwd: 'assets/videos/',
                src: '*',
                dest: 'dist/styles/videos/'
            }
        },
        watch: {
            sass: {
                files: ['<%= meta.sass_assets_dir %>/**/*.scss'],
                tasks: ['sass']
            },
            lint: {
                files: '<%= jshint.all %>',
                tasks: ['jshint','browserify']
            },
            copy_assets: {
                files: [ "<%= copy.images.cwd %>/**", "<%= copy.videos.cwd %>/**"],
                task: ['copy:images', 'copy:videos']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // // Default task(s)
    //grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['sass', 'cssmin', 'browserify', 'uglify', 'copy']);
    grunt.registerTask('build_dev', ['sass', 'browserify', 'copy']);
    grunt.registerTask('default', ['test', 'build']);
};