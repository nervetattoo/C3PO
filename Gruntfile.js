module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        connect: {
            app: {
                options: {
                    port: 9091,
                    base: './',
                    hostname: '*',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['connect']);
};
