import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePatientStore } from "../store/store";
import { DraftPatient } from "../types";
import { Error } from "./Error";

export default function PatientForm() {
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<DraftPatient>();

  const { addPatient, currentId, patients, updatePatient } = usePatientStore();

  useEffect(() => {
    if (currentId) {
      const activePatient = patients.find(
        (patient) => patient.id === currentId
      );

      setValue("name", activePatient?.name ?? "");
      setValue("caretaker", activePatient?.caretaker ?? "");
      setValue("email", activePatient?.email ?? "");
      setValue("date", activePatient?.date as Date);
      setValue("symptoms", activePatient?.symptoms ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  const handleRegister = (data: DraftPatient) => {
    if (currentId) {
      updatePatient(data);
      toast.info("Paciente actualizado.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      addPatient(data);
      toast.success("Paciente agregado.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    reset();
  };

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {""}
        <span className='text-indigo-600 font-bold'>Administralos </span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        noValidate
      >
        <div className='mb-5'>
          <label htmlFor='name' className='text-sm uppercase font-bold'>
            Paciente
          </label>
          <input
            id='name'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre del Paciente'
            {...register("name", {
              required: "Este campo es requerido",
            })}
          />

          {formState.errors.name && (
            <Error>{formState.errors.name?.message}</Error>
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='caretaker' className='text-sm uppercase font-bold'>
            Propietario
          </label>
          <input
            id='caretaker'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre del Propietario'
            {...register("caretaker", {
              required: `El campo es requerido`,
            })}
          />

          {formState.errors.caretaker && (
            <Error> {formState.errors.caretaker.message} </Error>
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='text-sm uppercase font-bold'>
            Email
          </label>
          <input
            id='email'
            className='w-full p-3  border border-gray-100'
            type='email'
            placeholder='Email de Registro'
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />

          {formState.errors.email && (
            <Error> {formState.errors.email.message} </Error>
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='date' className='text-sm uppercase font-bold'>
            Fecha Alta
          </label>
          <input
            id='date'
            className='w-full p-3  border border-gray-100'
            type='date'
            {...register("date", {
              required: "Este campo es requerido",
            })}
          />

          {formState.errors.date && (
            <Error> {formState.errors.date.message} </Error>
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='symptoms' className='text-sm uppercase font-bold'>
            Síntomas
          </label>
          <textarea
            id='symptoms'
            className='w-full p-3  border border-gray-100'
            placeholder='Síntomas del paciente'
            {...register("symptoms", {
              required: "Este campo es requerido",
            })}
          />

          {formState.errors.symptoms && (
            <Error> {formState.errors.symptoms.message} </Error>
          )}
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value='Guardar Paciente'
        />
      </form>
    </div>
  );
}
