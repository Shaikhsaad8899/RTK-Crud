import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInput } from '../../Redux/slices/userInput';

const Input = () => {
    const [input, setInput] = useState("");
    const [input1, setInput1] = useState("");
    const userInputData = useSelector(state => state.userinputs.userInput);

    const dispatch = useDispatch(); // Initialize useDispatch hook

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSave = () => {
        // Dispatch an action to Redux store with the input value
        dispatch(addInput(input));
        console.log(input);
        console.log(userInputData,"userInputData");
        
        // Update input1 state immediately with the current input value
        setInput1(input);
        
        // Clear input field after saving
        setInput("");
    }
    


    return (
        <>
            <div>Input</div>
            <input type="text" value={input} onChange={handleInputChange} />
            <button onClick={handleSave}>Save</button> {/* Call handleSave when the button is clicked */}
             <h1>{input1}</h1>

        </>
    );
}

export default Input;
