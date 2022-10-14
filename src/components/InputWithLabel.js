import React, {useEffect, useRef} from "react"
import style from "./InputWithLabel.module.css"; 
import PropTypes from "prop-types";

const InputWithLabel = (props) => {

const inputRef = useRef();

useEffect(() => {
    inputRef.current.focus();
});

return ( 

<div>
    <label htmlFor ="todoTitle">{props.children}</label>
    <input className={style.input}
     id={props.id}
     type="text"
     name={props.name}
     value={props.value}
     onChange={props.onChange}
     ref={inputRef}

    />
</div>
    )
}


InputWithLabel.propTypes = {
    props: PropTypes.func,
};

export default InputWithLabel