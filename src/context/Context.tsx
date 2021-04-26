import React, {useContext, useState} from 'react';

const Context = React.createContext();
const UpdateContext = React.createContext();


export function useC () {
    return useContext(Context)
}

export function useUpdateC () {
    return useContext(UpdateContext)
}


export function Provider ({children}:any) {

    const [context, setContext] = useState()

    function updateData (data:User) {
        setContext(prevData => data)
    }

    return (
        <Context.Provider value={{context}}>
            <UpdateContext.Provider value={{updateData}}>
                {children}
            </UpdateContext.Provider>
        </Context.Provider>
    )
}