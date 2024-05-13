import { usePatientStore } from "../store/store";
import { PatientDetails } from "./PatientDetails";

export const PatientList = () => {
  const { patients } = usePatientStore();

  return (
    <div className='md:w-1/2 lg:3/5'>
      {patients.length ? (
        <>
          <h2 className=' font-black text-3xl text-center'>
            Listado de pacientes
          </h2>
          <p className=' text-xl mt-5 mb-10'>
            Administra tus
            <span>
              <span className='text-indigo-600 font-bold'> pacientes</span>
            </span>
          </p>
          {patients.map((patient) => (
            <PatientDetails key={patient.id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza a agregar pacientes
            <span className='text-indigo-600 font-bold'>
              y apareceran aqui!{" "}
            </span>
          </p>
        </>
      )}
    </div>
  );
};
