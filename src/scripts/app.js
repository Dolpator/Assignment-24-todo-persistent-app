const ReactDOM = require('react-dom');
const React = require('react');
const Backbone = require('backbone');
const $ = require('jquery');

const ToDoView = require('./todo-view.js')
const DoneList = require('./done-list.js')
const UndoneList = require('./undone-list.js')


const AppRouter = Backbone.Router.extend({
   routes: {
      "undone" : "showUndone",
      "done" : "showDone",
      "" : "showHomePage"
   },

   showUndone: function(){


   },
   showDone: function(){



   },

   showHomePage: function(){

   },

   initialize: function(){
      Backbone.history.start();
   }
})

var myApp = new AppRouter()
