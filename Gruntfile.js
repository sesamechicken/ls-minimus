module.exports = function(grunt) {
  grunt.registerTask('uglify', 'uglify');
  grunt.registerTask('cssmin', 'cssmin');

  grunt.initConfig({
   
   uglify: {
     build: {
     	src: ['js/app.js'],
     	dest: 'js/app.min.js'
      }
    },
    cssmin: {
     build: {
     	src: ['css/app.css'],
     	dest: 'css/app.min.css'
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
 
};