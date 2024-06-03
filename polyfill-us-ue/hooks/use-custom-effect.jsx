import { useRef } from "react";

const useCoustomEffect = (effect, deps) => {

    // First Render 

    const isFirstRender = useRef(true);
    const prevDeps = useRef([]);

    if(isFirstRender.current)
    {
        isFirstRender.current = false
        const cleanup = effect();
        return () => {
            if(cleanup && typeof cleanup === 'function' && deps){
                cleanup();
            }
        }
    }

    // Deps changes and no deps array 
    const depsChanged = deps ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current) : true;
   
     if(depsChanged){
        const cleanup = effect();
        if(cleanup && typeof cleanup === 'function' && deps){
            cleanup();
        }
     }
   
    // Clean Up

    prevDeps.current = deps || [];
}

export default useCoustomEffect;