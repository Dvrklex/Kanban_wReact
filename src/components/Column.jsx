import TaskService from './TaskService'
import { useState } from 'react';
import '../App.css';
// test
const Column = ({columnid}) => {
    //creacion de las 3 columnas
    return (
            <div className="cont">
                <div className="cont-taskservice">
                    {/* Identifoco el ID de la Columna a la que pertenece la tarea
                    y lo envio al componente TaskService */}
                    <TaskService
                        columnid={columnid}
                    />
                </div>
            </div>
    )
}
 
export default Column;