import React, { useState } from 'react'
import Column  from './Column'
import '../App.css';
const ColumnContainer = () => {
    const [column, setColumns] = useState([{
        id: 1,
        nombre:'To Do',
    },{
        id: 2,
        nombre:'Doing',
    },{
        id: 3,
        nombre:'Done',
    }])        

    

    return (
            <div className='contenedor'>
                {   
                    column.map((col) =>(
                        <div key={col.id} className="colums-cont" >
                            <div className='card-column' >
                                <h4 className='col-title' >{col.nombre}</h4>
                                <div class="linea"></div>
                                <div>
                                    <Column 
                                        columnid={col.id}
                                    />
                                </div>
                                <div></div>
                            </div>
                        </div>          
                    ))        
                }
                </div>


    )
}
 
export default ColumnContainer;