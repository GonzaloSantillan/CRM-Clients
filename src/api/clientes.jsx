export async function getClients(){
    const respuesta = await fetch(import.meta.env.VITE_API_URL); 
    const data = await respuesta.json();
    //console.log(Object.keys(data).map(key => data[key]));
    return Object.keys(data).map(key => data[key]);
}

export async function getClient(id){
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`); 
    const data = await respuesta.json();
    return data;
}

export async function addClient(cliente){
    try{
        cliente.id=Date.now();
        const respuesta = await fetch(import.meta.env.VITE_API_URL,{
            method:"POST",
            body:JSON.stringify(cliente),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const res = await respuesta.json();
        return res;
    }
    catch (error){
        return (error);
    }
}

export async function editClient(cliente){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${cliente.id}`,{
            method:"PUT",
            body:JSON.stringify(cliente),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const res = await respuesta.json();
        return res;
    }
    catch (error){
        return (error);
    }
}

export async function destroyClient(id){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method:"DELETE"
        });
        const res = await respuesta.json();
        return res;
    }
    catch (error){
        return error;
    }
}