import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useForm } from "../../hooks/useForm";

export const Form = () => {
  const { addMedication } = useContext(GlobalContext);

  const [form, onChangeForm, resetForm] = useForm({
    id: crypto.randomUUID(),
    medication: "",
    dose: "",
    startDate: "",
    startTime: "08:00",
    days: "",
    continuous: false,
    interval: "",
  });

  const sendForm = (event) => {
    event.preventDefault();

    addMedication(form);

    resetForm();
  };
  // const filter = (event) => {
  //   event.preventDefault();

  //   resetForm();
  // };
  return (
    <>
      <form onSubmit={sendForm}>
        <label>
          Medicamento:
          <input
            type="text"
            name="medication"
            value={form.medication}
            onChange={onChangeForm}
            required
          />
        </label>

        <label>
          Dose:
          <input
            type="text"
            name="dose"
            value={form.dose}
            onChange={onChangeForm}
            required
          />
        </label>

        <label>
          Data de início:
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={onChangeForm}
            required
          />
        </label>
        <label>
          Horário de início:
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={onChangeForm}
          />
        </label>

        <label>
          Quantos dias:
          <input
            type="number"
            name="days"
            value={form.days}
            onChange={onChangeForm}
            disabled={form.continuous}
          />
        </label>

        <label>
          Uso contínuo
          <input
            type="checkbox"
            name="continuous"
            checked={form.continuous}
            onChange={onChangeForm}
          /> Sim
        </label>

        <label>
          Intervalo entre doses (horas)
          <input
            type="number"
            name="interval"
            value={form.interval}
            onChange={onChangeForm}
            required
          />
        </label>

        <button type="submit">Salvar</button>
      </form>
      {/* <form onSubmit={filter}>
        <h1>Filtrar medicamentos
        </h1>
        <label>
          Nome do Medicamento:
          <input
            type="text"
            name="filterMedication"
            value={form.filterMedication}
            onChange={onChangeForm}
          />
        </label>

        <button type="submit">Filtrar</button>
      </form> */}
    </>
  );
};
