import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { formatDate } from "../utils/formatDate";
import { generateSchedule } from "../utils/generateSchedule";

export const MedicationsTable = () => {
  const {
    medications,
    takenMap,
    toggleTaken,
    removeMedication,
    updateMedication
  } = useContext(GlobalContext);

  const schedule = generateSchedule(medications);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Medicamentos</th>
            <th>✅</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(schedule)
            .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
            .map(([date, times]) => {
              const sortedTimes = Object.entries(times).sort(([a], [b]) => {
                if (a === "24:00") return 1;
                if (b === "24:00") return -1;

                return a.localeCompare(b);
              });

              const totalRowsForDay = sortedTimes.reduce(
                (acc, [, meds]) => acc + meds.length,
                0
              );

              let isFirstRowOfDay = true;

              return sortedTimes.flatMap(([time, meds]) => {
                let isFirstRowOfTime = true;

                return meds.map((med) => {
                  const takenKey = `${date}|${time}|${med.id}`;

                  const row = (
                    <tr key={`${date}-${time}-${med.id}`}>
                      {isFirstRowOfDay && (
                        <td rowSpan={totalRowsForDay}>
                          {formatDate(date)}
                        </td>
                      )}

                      {isFirstRowOfTime && (
                        <td rowSpan={meds.length}>
                          {time}
                        </td>
                      )}

                      <td>{med.label}</td>

                      <td>
                        <input
                          type="checkbox"
                          checked={takenMap[takenKey] || false}
                          onChange={() => toggleTaken(takenKey)}
                        />
                      </td>

                      <td>
                        <button
                          type="button"
                          onClick={() => removeMedication(med.id)}
                        >
                          Remover
                        </button>

                        {/* <button
                          type="button"
                          onClick={() => updateMedication(med.id)}
                        >
                          Editar
                        </button> */}
                      </td>
                    </tr>
                  );

                  isFirstRowOfDay = false;
                  isFirstRowOfTime = false;

                  return row;
                });
              });
            })}
        </tbody>
      </table>
    </div >
  );
};