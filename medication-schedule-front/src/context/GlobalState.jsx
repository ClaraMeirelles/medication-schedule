import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const MEDICATIONS_KEY = "medications_data";
const TAKEN_KEY = "medication_taken";

export const GlobalProvider = ({ children }) => {
  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem(MEDICATIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [takenMap, setTakenMap] = useState(() => {
    const saved = localStorage.getItem(TAKEN_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem(TAKEN_KEY, JSON.stringify(takenMap));
  }, [takenMap]);

  const addMedication = (newMedication) => {
    const newMed = {
      ...newMedication,
      id: crypto.randomUUID()
    }
    setMedications((prev) => [...prev, newMed]);
  };

  const updateMedication = (id, updatedMedication) => {
    setMedications((prev) =>
      prev.map((med) =>
        med.id === id
          ? { ...med, ...updatedMedication }
          : med
      )
    );
  };

  const removeMedication = (id) => {
    const confirmed = window.confirm(
      "Tem certeza que deseja remover esta medicação?"
    );

    if (confirmed) {
      setMedications((prev) => prev.filter((med) => med.id !== id));
    }
    setTakenMap((prev) => {
      const next = {};
      Object.keys(prev).forEach((key) => {
        if (!key.includes(id)) {
          next[key] = prev[key];
        }
      });
      return next;
    });
  };

  const toggleTaken = (key) => {
    setTakenMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <GlobalContext.Provider
      value={{
        medications,
        addMedication,
        removeMedication,
        takenMap,
        toggleTaken,
        updateMedication
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
