# Two-factor module

Handles two-factor codes.


## Install and usage

    bower install Life-Letters/two-factor --save

To make the templates available you can either manually
copy the views folder to your parent project directory. 

Alternatively, if you're using grunt, add the following to the
copy task:

    copy: {
      dist: {
        files: [{
          ...
        },{
          expand: true,
          cwd: './bower_components/angular-two-factor/views',
          src: '{,*/}*.html',
          dest: '<%= yeoman.dist %>/views'
        }

Add the following to the livereload server:

    livereload: {
      options: {
        open: true,
        middleware: function (connect) {
          return [
            ...
            connect.static('./bower_components/angular-two-factor')
          ];
        }
      }
    },

## Dev

    node server.js
