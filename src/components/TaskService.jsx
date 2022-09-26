import React, {useEffect, useState } from 'react';
import {isEmpty, size,alert, set, filter} from "lodash";
import '../App.css';
// npm i --save shortid
import shortid from "shortid";

const TaskService = ( {columnid}) => {
    const [task, setTask] = useState("")
    const [descripcionTarea, setDescripcionTarea] = useState("")
    const [IDColumna, setIDColumna] = useState(columnid)
    const [editModeForTheTask, setEditModeForTheTask] = useState(false)
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
    const addNewTask = (e) => {
      e.preventDefault()
    // Si esta vacia la tarea no se agrega
      if (isEmpty(task)){
        return
      }
      // Si no esta vacia la tarea se agrega
      const newTask = {
        id: shortid.generate(), // genera un id unico
        name: task, // nombre de la tarea
        description : descripcionTarea, // descripcion de la tarea
        idcolumna : IDColumna // id de la columna a la que pertenece la tarea
      }
      console.log(newTask) // muestra en consola la tarea
      setTasks([ ...tasks, newTask ]) // agrega la tarea al array de tareas
      setTask("") // limpia el input del titulo de la tarea
      setDescripcionTarea("") // limpia el input de la descripcion de la tarea
    }
  

    
    // Guardar la edicion de la tarea
    const TaskSaveMode = (e) => {
      e.preventDefault()
      //Validacion de tarea vacia
      if (isEmpty(task)){
        return
      }
      //edito el titulo y descripcion de la tarea
      const editedTasks = tasks.map(item => item.id === id ? {id, name: task,description:descripcionTarea,idcolumna: IDColumna} : item)
      setTasks(editedTasks) // actualizo el array de tareas
       
      setEditModeForTheTask(false) // desactivo el modo edicion
      setTask("") // limpio el input del titulo de la tarea
      setDescripcionTarea("") // limpio el input de la descripcion de la tarea
      setId("") // limpio el id de la tarea
      setIDColumna("") // limpio el id de la columna
    }
  
    const TaskDeleteMode = (id) => {
      const filteredTasks = tasks.filter(task => task.id !== id) //Filtro la tarea a eliminar en el array de tareas
      setTasks(filteredTasks) // Actualizo el array de tareas con la tarea eliminada
    }
  
    const TaskEditMode = (taske) => {
      setTask(taske.name) // seteo el titulo de la tarea a editar
      setDescripcionTarea(taske.description) // seteo la descripcion de la tarea a editar
      setEditModeForTheTask(true) // activo el modo edicion
      setId(taske.id) // seteo el id de la tarea a editar
    }

    //identifico la columna en la que se encuentra la tarea
    const columnTask = tasks.filter(task => task.idcolumna === IDColumna)
    
    const TaskMoveMode = (taske) => {
      setId(taske.id)
      setTask(taske.name)
      setDescripcionTarea(taske.description)
      setIDColumna(taske.idcolumna)
      // console.log(taske.name,"Este es el nombre de la tarea para mover")
      // console.log(taske.id,"Este es el id de la tarea para mover")
      // console.log(taske.idcolumna,"Este es el id de la columna para mover")
      // console.log(IDColumna,"Este es el id de la columna donde se encuentra la tarea")
     
      // Cambio el id de la columna de la tarea por el id de la columna siguiente
      if (IDColumna === 1){
        const editedColumnIDTasks = tasks.map(item => taske.idcolumna == IDColumna && item.id === taske.id ? {id:item.id, name: item.name,description:item.description,idcolumna: 2} : item)
        setTasks(editedColumnIDTasks)
        // console.log(taske.name)
        setId("")
        setTask("")
        setDescripcionTarea("")
        setIDColumna("")
      }
      if (IDColumna=== 2){
        const editedColumnIDTasks = tasks.map(item => taske.idcolumna == IDColumna && item.id === taske.id ? {id:item.id, name: item.name,description:item.description,idcolumna: 3} : item)
        setTasks(editedColumnIDTasks)
        // console.log(taske.name)
        setId("")
        setTask("")
        setDescripcionTarea("")
        setIDColumna("")
      }
      if (IDColumna === 3){
        const editedColumnIDTasks = tasks.map(item => taske.idcolumna == IDColumna && item.id === taske.id ? {id:item.id, name: item.name,description:item.description,idcolumna: 1} : item)
        setTasks(editedColumnIDTasks)
        // console.log(taske.name)
        setId("")
        setTask("")
        setDescripcionTarea("")
        setIDColumna("")
      }
      
    }

    
    return (
      <>
      <div className='task-container'>
        <div className="row">
          <div className="col-12">
            <hr />
            <div className="row">
              <div className="col-8">
                {size(tasks) === 0 ? ( // si el array de tareas esta vacio muestra el mensaje
                  <h3 className="noTask text-center">Column empty</h3>
                ) : (
                  <ul className="list-group"> 
                    {filter(columnTask, (task) => task.idcolumna === IDColumna).map((task) => ( 
                      // si el array de tareas no esta vacio muestra las tareas
                       // si el array de tareas tiene tareas las muestra
                     
                        <div className="list-group-item" key={task.id}>
                          <h3 className="title-task-card">{task.name}</h3>
                          <p className='description-task-card'>{task.description}</p>
                          {/* Boton para Eliminar una tarea */}
                          <button className="btn-del-task" onClick={() => TaskDeleteMode(task.id)} title='Delete Task'>✖</button>
                          {/* Boton para Editar una tarea */}
                          <button className="btn-edit-task" onClick={() => TaskEditMode(task)} title='Edit Task'>🖋</button>
                          {/* Boton para mover una tarea a otra columna */}
                          <button className="btn-move-task" onClick={() => TaskMoveMode(task)} title='Move Task'>⇆</button>
                        </div>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Formulario para agregar o editar los titulos y descripciones de las tareas */}
      <div className="formContainer">
            <div className="cont-form">
              <form className='form-contenido' onSubmit={editModeForTheTask ? TaskSaveMode : addNewTask}>
                <input type="text" className="form-title" placeholder="Title" onChange={(text) => setTask(text.target.value)} value={task} />
                <input type="text" className="form-description" placeholder="Description" onChange={(text) => setDescripcionTarea(text.target.value)} value={descripcionTarea} />
                      {/* El boton de añadir nueva tarea cambia su estado cuando se aprieta el boton para editar la tarea */}
                <button className={editModeForTheTask ? "btn-edit-task" : "btn-add-task"} type="submit">
                  {editModeForTheTask ? <i class="save-edit-task" title='Save Changes'> 💾</i> : <i class="add-new-task" title='Add New Task'> ➕</i>}
                </button>
              </form>
          </div>

        </div></>
      );
}
  
export default TaskService;

// Language: javascript