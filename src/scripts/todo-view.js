const ReactDOM = require('react-dom');
const React = require('react');
const Backbone = require('backbone');
const $ = require('jquery')


const {TaskListModel, TaskListCollection} = require('./task-model.js')


const ToDoView = React.createClass({
   getInitialState: function(){

      let listStateObj = {
         taskListData: this.props.taskListDataColl,
      }
      return listStateObj

   },



   // _handleChange: function(){
   //
   //       Backbone.Events.on('update-selected')
   //          if(checkStatus === 'true'){
   //             selectedTask[id]
   //          } else{
   //             delete.selectedTask[id]
   //          }

  // },
   componentWillMount: function(){
      let self = this
      Backbone.Events.on('new-task', function(){

         let newTaskCollection = new TaskListCollection()
         newTaskCollection.fetch().then(function(){
            self.setState({taskListData: newTaskCollection})
         })
      })
   },


   _doneSubmit: function(){
      window.location.hash='#done'
   },
   _undoneSubmit: function(){
      window.location.hash='#undone'
   },
   _deleleSubmit: function(){
      const checkedBoxEl = Array.from(document.querySelectorAll(".check-box"))
      console.log('test', checkedBoxEl);

      checkedBoxEl.forEach(function(objVal, i){
         if(objVal.checked === true){
            let listItem = objVal.parentNode;
            listItem.parentNode.removeChild(listItem)
            // Backbone.Events.trigger('update-selected', this.props.get('_id'), checkStatus)
         }

      })
   },

   _handleSubmit: function(evt){
      evt.preventDefault()
     //console.log (this.refs.listInputEl.value)
      let theList = this.refs.listInputEl.value
         let newList = new TaskListModel()
         newList.set({
            task: theList,
      })
      newList.save().then(function(serverRes){
        Backbone.Events.trigger('new-task')

      })

},


   render: function(){
      //console.log(this.state.taskListData)
      return (
         <div className='todoListMain'>
                  <h3 className ="header">Weekly TODO List</h3>
               <div className="row">
                  <div className="col-md-6 col-md-offset-3 input-div">
                     <form>
                     <div>
                        <input className="form-control task-input" ref="listInputEl" placeholder="Enter Task"></input>
                     </div>
                     <div>
                     </div>
                        <button className="btn primary" onClick={this._handleSubmit}>Add to List</button>
                     </form>
                  </div>
                  <CreateListArray itemListData={this.state.taskListData}/>
               </div>
                  <button className="btn primary" onClick={this._deleleSubmit}>Remove from List</button>
                  <button className="btn primary" onClick={this._doneSubmit}>Completed Task</button>
                  <button className="btn primary" onClick={this._undoneSubmit}>Save Task for Later</button>

            </div>
            )
         }
      })
   const CreateListArray = React.createClass({
      render: function(){
            let self = this
            let copyListArray = this.props.itemListData.map(function(modl, i){
                //console.log(modl)
               return (
                  <ListData listModelEl ={modl} key={i} />
               )
            })
            //console.log(copyListArray)
            return (
               <div>
                  {copyListArray}
               </div>
               )
            }
         })
   const ListData = React.createClass({
      render: function(){
         //console.log(this.props.listModelEl)

            return (
                  <div className="checkbox">
                     {this.props.listModelEl.get('task')}
                     <input type='checkbox' onChange ={this._handleChange} className="check-box" defaultChecked={false} />

                  </div>
                  )
               }
            })
let taskListCollInstance = new TaskListCollection()
   taskListCollInstance.fetch().then(function(){
      console.log(taskListCollInstance)

ReactDOM.render(<ToDoView taskListDataColl={taskListCollInstance}/>, document.querySelector("#app-container"));
})
module.exports = ToDoView
