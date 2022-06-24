import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';

const TodoList = () => {
    const current = new Date();
  const date = `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`;
const [modal, setModal] = useState(false);
const [taskList, setTaskList] = useState([])

useEffect(() => {
    let arr = localStorage.getItem("taskList")
    
    if(arr){
        let obj = JSON.parse(arr)
        setTaskList(obj)
    }
}, [])
 
const deleteTask = (index) => {
    let tempList = taskList
    tempList.splice(index, 1)
    localStorage.setItem("taskList", JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
}

const updateListArray = (obj, index) =>{
    let tempList = taskList
    tempList[index] = obj
    localStorage.setItem("taskList", JSON.stringify(tempList))
    setTaskList(tempList)
    window.location.reload()
}

const toggle = () => {
    setModal(!modal);
}
const saveTask = (taskObj) => {
    let tempList = taskList
    tempList.push(taskObj)
    localStorage.setItem("taskList", JSON.stringify(tempList))
    setTaskList(tempList)
    setModal(false)
}
    return (
        <div className='header text-center'>
            <h1>To-do List</h1>
            <h3> {date}</h3>
            <button className='btn btn-primary' style={{"background-color" : "#1A1B2F", "margin-bottom" : "0.5em"}} onClick={() => setModal(true)}>Create Task</button>
      <div className='task-container' style={{"color" : "black"}}>
{taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
      </div>
        <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
     </div>
    );
};
export default TodoList;