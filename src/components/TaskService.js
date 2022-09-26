import React, {useEffect, useState } from 'react';
import {isEmpty, size,alert, set} from "lodash";
import '../App.css';
// npm i --save shortid
import shortid from "shortid";

const TaskService = ( {columnid}) => {
    const [task, setTask] = useState("")
    const [descripcionTarea, setDescripcionTarea] = useState("")
    const [IDColumna, setIDColumna] = useState(columnid)
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState("")


    const [tasks, setTasks] = useState(() => {
        const localData = localStorage.getItem("dataTask");
        if (localData) {
            return JSON.parse(localData);
        }
        else {
          return [];
        }
    });
    useEffect(() => {
        localStorage.setItem("dataTask", JSON.stringify(tasks));
    }, [tasks]);


    // validacion de la tarea
    const addTask = (e) => {
      e.preventDefault()
      if (isEmpty(task)){
        
        return
      }
  
      const newTask = {
        id: shortid.generate(),
        name: task,
        description : descripcionTarea,
        idcolumna : IDColumna
      }
      console.log(newTask)
      setTasks([ ...tasks, newTask ])
      setTask("")
      setDescripcionTarea("")
    }
  

    
    const saveTask = (e) => {
      e.preventDefault()
      //Validacion de tarea vacia
      if (isEmpty(task)){
        alert("Debe ingresar una tarea")
        return
      }
      //edito el titulo y descripcion de la tarea
      const editedTasks = tasks.map(item => item.id === id ? {id, name: task,description:descripcionTarea} : item)
      setTasks(editedTasks)
      
      setEditMode(false)
      setTask("")
      setDescripcionTarea("")
      setId("")
    }
  
    const deleteTask = (id) => {
      const filteredTasks = tasks.filter(task => task.id !== id)
      setTasks(filteredTasks)
    }
  
    const editTask = (taske) => {
      // console.log(taske.name,'Este es el nombre de la tareaa a editar')
      setTask(taske.name)
      // console.log(taske.description,'esta es la descripcion a editar')
      setDescripcionTarea(taske.description)
      setEditMode(true)
      setId(taske.id)
    }

    //identifico la columna en la que se encuentra la tarea
    const columnTask = tasks.filter(task => task.idcolumna === IDColumna)
    
    
    return (
      <>
      <div className='task-container'>
        <div className="row">
          <div className="col-12">
            <hr />
            <div className="row">
              <div className="col-8">
                {size(tasks) === 0 ? (
                  <h3 className="noTask text-center">Column empty</h3>
                ) : (
                  <ul className="list-group">
                    {tasks.map((task) => (
                     
                      
                      <div className="list-group-item" key={task.id}>
                        <h3 className="title-task-card">{task.name}</h3>
                        <p className='description-task-card'>{task.description}</p>
                        <button className="btn-del-task" onClick={() => deleteTask(task.id)} title='Delete Task'>✖</button>
                        <button className="btn-edit-task" onClick={() => editTask(task)} title='Edit Task'>🖋</button>
                        <button className="btn-move-task" onClick={() => editTask(task)} title='Move Task'>⇆</button>
                      </div>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      
      <div className="formContainer">
            <div className="cont-form">
              <form className='form-contenido' onSubmit={editMode ? saveTask : addTask}>
                <input type="text" className="form-title" placeholder="Title" onChange={(text) => setTask(text.target.value)} value={task} />
                <input type="text" className="form-description" placeholder="Description" onChange={(text) => setDescripcionTarea(text.target.value)} value={descripcionTarea} />

                <button className={editMode ? "btn-edit-task" : "btn-add-task"} type="submit">
                  {editMode ? <i class="save-edit-task" title='Save Changes'> 💾</i> : <i class="add-new-task" title='Add New Task'> ➕</i>}
                </button>
              </form>
          </div>

        </div></>
      );
}
  
export default TaskService;

// Language: javascript