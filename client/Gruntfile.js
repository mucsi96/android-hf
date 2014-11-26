module.exports = function(grunt) {

    var src = ['src/**/*.module.js', 'src/**/*.js', '!src/index.js', 'src/index.js'];

    grunt.initConfig(
        {
            concat: {
                sources: {
                    src: src,
                    dest: 'dist/app-bundle.js'
                }
            },
            manifest: {
                generate: {
                    options: {
                        basePath: 'dist/'
                    },
                    src: ['**/*.*'],
                    dest: 'app.cache'
                }
            },
            watch: {
                default: {
                    files: [src, ['dist/**/*.*']],
                    tasks: ['concat', 'manifest']
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-manifest');

    grunt.registerTask('default', ['watch']);
};