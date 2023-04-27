import { useNavigate, Form, useActionData, redirect, useLoaderData } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { addClient, getClient, editClient } from "../api/clientes";

const NuevoCliente = () => {
  const navigate = useNavigate();
  const errores = useActionData();
  const cliente = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">{cliente ? 'Edit Client':'New Client'}</h1>
      <p className="mt-3">{cliente ? 'Modify client data':'Complete all fields to register a new client'}</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md"
          onClick={() => navigate("..")}
        >
          Back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">
        {errores?.length && errores.map((error,i)=><Error key={i}>{error}</Error>)}
        <Form method="post">
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md hover:bg-blue-950"
            value={cliente ? 'Edit Client':'Save New Client'}
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;

export async function action({request, params}){
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const id=params.id;
    const errores=[];
    if(Object.values(datos).includes('')){
        errores.push("You must fill in all fields to register a new client");
        return errores;
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(datos.email)){
        errores.push('Invalid email address');
        return errores;
    }
    if(id){
      datos.id = id;
      await editClient(datos);
    }
    else{
      await addClient(datos);
    }
    return redirect('/');
};

export async function loader({params}){
  const cliente = await getClient(params.id);
  if(Object.values(cliente).length ===0){
      throw new Response('',{
          status:404,
          statusText:'No results.'
      });
  }
  return cliente;
}