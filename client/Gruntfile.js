module.exports = function(grunt) {

    var src = ['src/**/*.js'];
    var libs = ['lib/**/*.js'];

    grunt.initConfig(
        {
            concat: {
                options: {
                        banner: '(function(){\n"use strict";\n\n',
                        footer: '\n\n}());'
                },
                sources: {
                    src: src,
                    dest: 'dist/src-bundle.js'
                },
                libs: {
                    src: libs,
                    dest: 'dist/libs-bundle.js'
                }
            },
            watch: {
                default: {
                    files: src,
                    tasks: ['concat']
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};