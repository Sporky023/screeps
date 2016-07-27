module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: {
        email: 'wlgriffiths@gmail.com',
        password: 'budapest',
        branch: 'default',
        ptr: false
      },

      dist: { src: ['dist/*.js'] }
    }
  });
}
