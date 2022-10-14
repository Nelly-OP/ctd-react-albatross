import React, {useState} from "react";
import InputWithLabel from "./InputWithLabel";
import PropTypes from "prop-types";
import style from "./AddTodoForm.module.css";



const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle]= useState("")
console.log(AddTodoForm);
   const handleTitleChange = (event) => {
         const newTodoTitle = event.target.value;
         setTodoTitle(newTodoTitle);
   };
   const handleAddTodo=(event) =>{
    event.preventDefault();
    onAddTodo({title: todoTitle, id: Date.now()});
    setTodoTitle("");
   };

    return(
        <div>

             <form onSubmit={handleAddTodo}>
                 <InputWithLabel
                 todoTitle={todoTitle}
                 onChange={handleTitleChange}
                 children
                 inputRef
            >
                    <span className={style.title}>Title:</span>
                </InputWithLabel>
             <button className={style.Addbtn} type="submit">Add</button>
             </form>
             <footer>
                    <div className={style.footer}>
                      <h5>
                        Copyright@ Onella Powell
                      </h5>
                    </div>
             </footer>
        </div>
    )
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func,
};


export default AddTodoForm;
