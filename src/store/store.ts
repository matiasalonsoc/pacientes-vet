import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DraftPatient, Patient } from "../types";

type PatientState = {
  patients: Patient[];
  currentId: Patient["id"];

  addPatient: (data: DraftPatient) => void;
  removePatient: (id: Patient["id"]) => void;
  activeId: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        currentId: "",

        addPatient: (data) => {
          set((state) => ({
            patients: [...state.patients, { ...data, id: uuidv4() }],
          }));
        },

        removePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },

        activeId: (id) => {
          set(() => ({
            currentId: id,
          }));
        },

        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.currentId
                ? { ...data, id: state.currentId }
                : patient
            ),

            currentId: "",
          }));
        },
      }),
      {
        name: "sesion-storage",
      }
    )
  )
);
