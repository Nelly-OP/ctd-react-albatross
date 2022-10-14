import React, {useEffect, useRef} from "react"
import style from "./InputWithLabel.module.css"; 
import PropTypes from "prop-types";

const InputWithLabel = ({todoTitle, handleTitleChange, children}) => {

const inputRef = useRef();

useEffect(() => {
    inputRef.current.focus();
});

return ( 

<div>
    <label htmlFor ="todoTitle">{children}</label>
    <input className={style.input}
     id="todoTitle"
     type="text"
     name="title"
     value={todoTitle}
     onChange={handleTitleChange}
     ref={inputRef}

    />
</div>
    )
}


InputWithLabel.propTypes = {
    props: PropTypes.func,
};

export default InputWithLabel