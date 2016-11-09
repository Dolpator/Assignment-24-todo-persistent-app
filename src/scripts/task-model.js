const Backbone = require('backbone')

let TaskListModel = Backbone.Model.extend({
   url: "/api/tasklist",

})
let DestroyListModel = Backbone.Model.extend({
   model: TaskListModel,
   idAttribute: '_id',
   url: "/api/tasklist"
})

let TaskListCollection = Backbone.Collection.extend({
   model: TaskListModel,
   url: "/api/tasklist"
})

module.exports ={
   TaskListModel,
   TaskListCollection
}
