// Export timetable as JSON file
const exportTimetable = (timetable) => {
  const dataStr = JSON.stringify(timetable, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "timetable.json";
  link.click();

  URL.revokeObjectURL(url);
};

// Import timetable from JSON file
const importTimetable = (file, callback) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const imported = JSON.parse(evt.target.result);

      if (!Array.isArray(imported)) {
        alert("Invalid timetable format!");
        return;
      }

      callback(imported);
    } catch (err) {
      alert("Failed to import timetable. Invalid JSON.");
    }
  };
  reader.readAsText(file);
};

export { exportTimetable, importTimetable };