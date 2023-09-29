import { useLoaderData } from "react-router-dom";
import ClientRow from "../components/ClientRow";
import { getClients } from "../api/clientes";

const Index = () => {
    const clientes = useLoaderData();
    return ( <>
        <h1 className="font-black text-4xl text-blue-900">Clients</h1>
        <p className="mt-3">Manage your clients</p>
        { clientes.length ? (
            <table className="w-full bg-white shadow mt-5 table-auto rounded-md overflow-hidden">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Client</th>
                        <th className="p-2">Contact Info</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((it)=>(
                        <ClientRow key={it.id} client={it}/>
                    ))}
                </tbody>
            </table>
        ):(
            <p className="text-center mt-10">There are no clients yet!!</p>
        )}
    </> );
}
 
export default Index;

export function loader(){
    return getClients();
}