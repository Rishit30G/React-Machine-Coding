import { useState } from "react";
import useCoustomEffect from "../../hooks/use-custom-effect";

export function Counter() {
    const [count, setCount] = useState(0);

    useCoustomEffect(() => {
        console.log("Effect Triggered: ", count);
        return () => {
            console.log("Clean Up");
        }
    }, [count]);

    console.log("rendered");

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>Counter</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <p>{count}</p>
        </div>
    )
}