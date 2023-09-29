import { Form, redirect, useNavigate } from "react-router-dom";
import { destroyClient } from "../api/clientes";

const ClientRow = ({ client }) => {
  const { nombre, empresa, email, telefono, id } = client;
  const navigate = useNavigate();
  //console.log(client);
  return (
    <tr className="border-b">
      <td className="p-5 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>
      <td className="p-5">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Phone: </span>
          {telefono}
        </p>
      </td>
      <td className="p-5 flex gap-4">
        <button
          onClick={() => navigate(`/client/${id}/edit`)}
          className="text-blue-600 hover:text-blue-800 uppercase font-bold text-xs"
        >
          Editar
        </button>
        <Form method="post" action={`/client/${id}/destroy`} onSubmit={(e)=>{
          if(!confirm(`Are you sure to delete ${nombre.toUpperCase()} from clients?`)){
            e.preventDefault();
          }
        }}>
          <button className="text-red-600 hover:text-red-800 uppercase font-bold text-xs">
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default ClientRow;

export async function action({params}){
  await destroyClient(params.id);
  return redirect('/');
}