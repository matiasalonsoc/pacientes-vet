import { toast } from "react-toastify";
import { usePatientStore } from "../store/store";
import { Patient } from "../types";
import { PatientDetailItem } from "./PatientDetailItem";

type PatientDetailsProps = {
  patient: Patient;
};

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const { removePatient, activeId } = usePatientStore();

  const handleRemove = (id: Patient["id"]) => {
    removePatient(id);
    toast.error("Paciente eliminado.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleEdit = (id: Patient["id"]) => {
    activeId(id);
    toast.info("Editando paciente", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
      <PatientDetailItem label='ID' data={patient.id} />
      <PatientDetailItem label='Nombre' data={patient.name} />
      <PatientDetailItem label='Propietario' data={patient.caretaker} />
      <PatientDetailItem label='Email' data={patient.email} />
      <PatientDetailItem label='Fecha' data={patient.date.toString()} />
      <PatientDetailItem label='Sintomas' data={patient.symptoms} />

      <div className=' flex flex-col md:flex-row gap-5 md:gap-2 justify-between mt-10'>
        <button
          onClick={() => handleEdit(patient.id)}
          className=' py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
        >
          Editar
        </button>

        <button
          onClick={() => handleRemove(patient.id)}
          className=' py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
