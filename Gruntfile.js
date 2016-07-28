module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: {
        email: 'wlgthrow@gmail.com',
        password: 'budapest1',
        branch: 'default',
        ptr: false
      },

      dist: { src: ['dist/*.js'] }
    }
  });
}
