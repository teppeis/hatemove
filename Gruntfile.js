/*jshint camelcase: false*/
// Generated on 2013-05-09 using generator-chrome-extension 0.1.1
'use strict';
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            dist: {
                files: ['<%= yeoman.app %>/typescripts/{,*/}*.ts', 'test/spec.ts/{,*/}*.ts', '<%= yeoman.app %>/sass/{,*/}*.{scss,sass}', '<%= yeoman.app %>/*.{html,json}'],
                tasks: ['watch-test', 'build']
            },
            test: {
                files: ['<%= yeoman.app %>/typescripts/{,*/}*.ts', 'test/spec.ts/{,*/}*.ts'],
                tasks: ['watch-test']
            },
            css: {
                files: ['<%= yeoman.app %>/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            test: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.app %>/scripts/*',
                        '<%= yeoman.app %>/styles/*',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            test: ['test/spec']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/test/index.html']
                }
            }
        },
        typescript: {
            options: {
                module: 'amd',
                // module: 'commonjs',
                target: 'es5',
                sourcemap: true,
                fullSourceMapPath: false,
                declaration: false
            },
            background: {
                options: {
                    base_path: 'app/typescripts'
                },
                src: ['app/typescripts/background.ts'],
                dest: 'app/scripts/background.js'
            },
            /*
            popup: {
                options: {
                    base_path: 'app/typescripts'
                },
                src: ['app/typescripts/popup.ts'],
                dest: 'app/scripts/popup.js'
            },
            */
            test: {
                options: {
                    base_path: 'test/spec.ts'
                },
                src: ['test/spec.ts/index.ts'],
                dest: 'test/spec/index.js'
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/sass',
                cssDir: '<%= yeoman.app %>/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        useminPrepare: {
            html: [
                '<%= yeoman.app %>/popup.html'
            ],
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            //css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'styles/{,*/}*.css',
                        'images/{,*/}*.{webp,gif}',
                        '_locales/{,*/}*.json'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'typescript-dist',
                //'compass:server'
            ],
            test: [
                'typescript'
            ],
            dist: [
                'typescript-dist',
                //'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        compress: {
            dist: {
                options: {
                    archive: 'package/hatemove.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('prepareManifest', function() {
        var scripts = [];
        var concat = grunt.config('concat') || {dist: {files: {}}};
        var uglify = grunt.config('uglify') || {dist: {files: {}}};
        var manifest = grunt.file.readJSON(yeomanConfig.app + '/manifest.json');

        if (manifest.background.scripts) {
            manifest.background.scripts.forEach(function(script) {
                scripts.push(yeomanConfig.app + '/' + script);
            });
            concat.dist.files['<%= yeoman.dist %>/scripts/background.js'] = scripts;
            uglify.dist.files['<%= yeoman.dist %>/scripts/background.js'] = '<%= yeoman.dist %>/scripts/background.js';
        }

        if (manifest.content_scripts) {
            manifest.content_scripts.forEach(function(contentScript) {
                if (contentScript.js) {
                    contentScript.js.forEach(function(script) {
                        uglify.dist.files['<%= yeoman.dist %>/' + script] = '<%= yeoman.app %>/' + script;
                    });
                }
            });
        }

        grunt.config('concat', concat);
        grunt.config('uglify', uglify);
    });

    grunt.registerTask('manifest', function() {
        var manifest = grunt.file.readJSON(yeomanConfig.app + '/manifest.json');
        manifest.background.scripts = ['scripts/background.js'];
        grunt.file.write(yeomanConfig.dist + '/manifest.json', JSON.stringify(manifest, null, 2));
    });

    grunt.registerTask('typescript-dist', [
        'typescript:background'
        //'typescript:popup'
    ]);

    grunt.registerTask('test', [
        'clean:test',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('watch-test', [
        'clean:test',
        'concurrent:test',
        'mocha'
    ]);

    grunt.registerTask('watch-dist', [
        'connect:test',
        'watch:dist'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'prepareManifest',
        //'useminPrepare',
        'concurrent:dist',
        'concat',
        //'uglify',
        //'cssmin',
        'copy',
        'usemin',
        'manifest',
        'compress'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
