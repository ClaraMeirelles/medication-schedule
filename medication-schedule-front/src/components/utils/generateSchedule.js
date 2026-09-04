export const generateSchedule = (medications) => {
  if (medications.length === 0) return {};

  const maxDays = Math.max(
    ...medications
      .filter((med) => !med.continuous)
      .map((med) => Number(med.days || 0)),
    10
  );

  const schedule = {};

  medications.forEach((med) => {
    const totalDays = med.continuous ? maxDays : Number(med.days);

    const startDateTime = new Date(`${med.startDate}T${med.startTime}`);

    const endDateTime = new Date(startDateTime);
    endDateTime.setDate(endDateTime.getDate() + totalDays);

    let currentDateTime = new Date(startDateTime);

    while (currentDateTime < endDateTime) {
      const hour = currentDateTime.getHours();
      const minute = currentDateTime.getMinutes();

      const isMidnight = hour === 0 && minute === 0;

      const displayDate = new Date(currentDateTime);
      if (isMidnight) {
        displayDate.setDate(displayDate.getDate() - 1);
      }

      const dateKey = `${displayDate.getFullYear()}-${String(
        displayDate.getMonth() + 1
      ).padStart(2, "0")}-${String(displayDate.getDate()).padStart(2, "0")}`;

      const timeKey = isMidnight
        ? "24:00"
        : `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

      if (!schedule[dateKey]) {
        schedule[dateKey] = {};
      }

      if (!schedule[dateKey][timeKey]) {
        schedule[dateKey][timeKey] = [];
      }

      schedule[dateKey][timeKey].push({
        id: med.id,
        label: `${med.medication} (${med.dose})`,
      });
      currentDateTime = new Date(
        currentDateTime.getTime() + Number(med.interval) * 60 * 60 * 1000
      );
    }
  });

  return schedule;
};
