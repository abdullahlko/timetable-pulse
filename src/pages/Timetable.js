import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { days, periodTimes, periods } from "../constants/timetable";
import { exportTimetable, importTimetable } from "../utils/timetableIO";

const BREAK_AFTER_PERIOD = 4; // break column to be inserted after period index 4 (between P4 and P5)

// auto-dismissing toast
const Toast = ({ message, onDone }) => {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white text-sm px-5 py-2.5 rounded-full shadow-lg w-[90vw] sm:w-auto text-center sm:whitespace-nowrap">
      {message}
    </div>
  );
};

// modal for import/export confirmation
const InfoModal = ({ type, onConfirm, onCancel }) => {
  const isExport = type === "export";

  const message = isExport
    ? (
      <>
        This will <strong>Export</strong> your timetable as a file.<br />
        You can share it with others who follow the same timetable,<br />
        so they can <strong>Import</strong> it into the app and avoid manual filling.
      </>
    )
    : (
      <>
        Select a timetable file shared via this app.<br />
        This will <strong>Import</strong> the data into your timetable.
      </>
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-0"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl w-full sm:max-w-sm shadow-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-3 text-center">
          <p className="font-semibold text-gray-800 text-lg mb-2">
            {isExport ? "Export Timetable" : "Import Timetable"}
          </p>
          <div className="text-sm text-gray-600 leading-relaxed">
            {message}
          </div>
        </div>
        <div className="px-5 pb-5 pt-3 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${isExport ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            {isExport ? "Export" : "Select File"}
          </button>
        </div>
      </div>
    </div>
  );
};

// main timetable page
const Timetable = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Load saved timetable from localStorage or initialize as empty
  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("timetable");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === days.length) return parsed;
      } catch {
        localStorage.removeItem("timetable");
      }
    }
    return days.map(day => {
      const numPeriods = day === "Saturday" ? 4 : periods;
      return Array(numPeriods).fill({ subject: "", room: "" });
    });
  });

  // Temporary timetable copy for editing
  const [tempTimetable, setTempTimetable] = useState([]);
  const [modal, setModal] = useState(null);
  const [overflow, setOverflow] = useState(false);
  const [toast, setToast] = useState(null);
  const importInputRef = useRef(null);

  // Check if timetable is empty
  const isEmpty = table =>
    table.every(day => day.every(cell => !cell.subject && !cell.room));

  // Enable editing mode, copy current timetable to temp
  const handleEdit = () => {
    setTempTimetable(JSON.parse(JSON.stringify(timetable)));
    setIsEditing(true);
  };

  // Cancel editing and discard changes
  const handleCancel = () => setIsEditing(false);

  // Save changes and update localStorage
  const handleSave = () => {
    setTimetable(tempTimetable);
    localStorage.setItem("timetable", JSON.stringify(tempTimetable));
    setIsEditing(false);
  };

  // Update a single cell while editing
  const handleCellChange = (dayIndex, periodIndex, field, value) => {
    const updated = [...tempTimetable];
    updated[dayIndex][periodIndex] = { ...updated[dayIndex][periodIndex], [field]: value };
    setTempTimetable(updated);
  };

  // Clear all entries in temp timetable
  const handleClear = () => {
    const cleared = days.map(day => {
      const numPeriods = day === "Saturday" ? 4 : periods;
      return Array(numPeriods).fill({ subject: "", room: "" });
    });
    setTempTimetable(cleared);
  };

  // Confirm before clearing the timetable
  const handleClearClick = () => {
    if (window.confirm("This will clear the entire timetable. Continue?")) {
      handleClear();
    }
  };

  const handleExportConfirm = () => {
    setModal(null);
    exportTimetable(timetable);
    setToast("Timetable exported successfully");
  };
  const handleImportConfirm = () => {
    setModal(null);
    importInputRef.current?.click();
  };
  const handleImportFile = (file) => {
    importTimetable(file, (data) => {
      setTimetable(data);
      localStorage.setItem("timetable", JSON.stringify(data));
      setToast("Timetable imported successfully");
    });
  };

  return (
    <div className="min-h-screen">
      <Header variant="timetable" />
      {modal && <InfoModal type={modal} onConfirm={modal === "export" ? handleExportConfirm : handleImportConfirm} onCancel={() => setModal(null)} />}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      <input
        ref={importInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={e => { handleImportFile(e.target.files[0]); e.target.value = ""; }}
      />

      {/* Top bar */}
      <div className="border-b">
        <div className="relative px-5 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#3B82F6] hover:text-[#326dcc]"
          >
            <ArrowBackIcon fontSize="medium" />
            <span className="text-lg">Back</span>
          </button>

          {/* Desktop buttons */}
          <div className="hidden sm:flex ml-auto gap-4">
            {!isEditing ? (
              <>
                <button onClick={() => setModal("import")} className="px-4 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 flex items-center gap-1 text-sm">
                  <FileDownloadIcon fontSize="small" /> Import
                </button>
                <button
                  onClick={() => setModal("export")}
                  disabled={isEmpty(timetable)}
                  className={`px-4 py-1 border rounded flex items-center gap-1 text-sm ${isEmpty(timetable)
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  <FileUploadIcon fontSize="small" /> Export
                </button>
                <button onClick={handleEdit} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearClick}
                  className={`px-4 py-1 rounded text-white ${isEmpty(tempTimetable)
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                    }`}
                  disabled={isEmpty(tempTimetable)}
                >
                  Clear
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </>
            )}
          </div>

          {/* Mobile menu */}
          {!isEditing && (
            <div className="sm:hidden ml-auto relative">
              <button onClick={() => setOverflow(v => !v)} className="p-1 text-gray-600 hover:text-gray-900">
                <MoreVertIcon />
              </button>
              {overflow && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setOverflow(false)} />
                  <div className="absolute right-0 top-8 z-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[150px]">
                    <button onClick={() => { setOverflow(false); setModal("import"); }} className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <FileDownloadIcon fontSize="small" /> Import
                    </button>
                    <button onClick={() => { setOverflow(false); setModal("export"); }} disabled={isEmpty(timetable)} className={`w-full px-4 py-2 text-sm text-left flex items-center gap-2 ${isEmpty(timetable) ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"}`}>
                      <FileUploadIcon fontSize="small" /> Export
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Desktop inline title */}
          <div className="hidden sm:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-semibold underline">Weekly Timetable</h1>
          </div>
        </div>

        {/* Mobile title row */}
        <div className="sm:hidden w-full bg-gray-100 border-gray-300">
          <div className="max-w-screen-md mx-auto py-3 text-center">
            <h1 className="text-xl font-semibold underline">
              Weekly Timetable
            </h1>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {isEmpty(timetable) && !isEditing && (
        <div className="mx-2 mt-2 px-4 py-2 bg-yellow-50 border border-yellow-100 rounded text-sm text-yellow-800 text-center">
          No timetable yet. Tap <strong>Edit</strong> to fill it in or <strong>Import</strong> a shared timetable.
        </div>
      )}

      {/* Timetable table */}
      <div className={`mx-2 mb-24 border border-black overflow-x-auto ${isEmpty(timetable) && !isEditing ? "mt-1 sm:mt-2" : "mt-[7vh] sm:mt-[3vh]"}`}>
        <table className="w-full text-sm text-center table-fixed min-w-max">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-1 text-center">Day</th>
              {periodTimes.map((time, i) => (
                <React.Fragment key={i}>
                  <th className="border px-6 py-1 whitespace-nowrap text-center">
                    P{i + 1}
                    <div className="text-[10px] text-gray-500 text-center">{time.split(" - ")[0]}</div>
                  </th>
                  {/* Break column inserted after BREAK_AFTER_PERIOD */}
                  {i === BREAK_AFTER_PERIOD - 1 && (
                    <th className="border px-2 py-1 bg-gray-100 text-gray-500 text-center align-middle">
                      Break
                    </th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((day, dayIndex) => (
              <tr
                key={day}
                className={!isEditing ? "hover:bg-gray-100" : ""}
                style={{ height: "64px" }}
              >
                <td className="border p-1 font-semibold bg-gray-50">{day.slice(0, 3)}</td>

                {(timetable[dayIndex] || []).map((_, periodIndex) => {
                  const cell = (isEditing ? tempTimetable[dayIndex] : timetable[dayIndex])?.[periodIndex] || { subject: "", room: "" };

                  return (
                    <React.Fragment key={periodIndex}>
                      <td className={`border px-1 py-1 ${isEditing ? "hover:bg-yellow-100" : ""}`}>
                        {isEditing ? (
                          <div className="flex flex-col justify-center items-center gap-1 h-full">
                            <input
                              type="text"
                              placeholder="Subject"
                              maxLength={11}
                              value={cell.subject}
                              onChange={e => handleCellChange(dayIndex, periodIndex, "subject", e.target.value)}
                              className="border text-xs p-0.5 px-1 w-full text-center"
                            />
                            <input
                              type="text"
                              placeholder="Room"
                              maxLength={10}
                              value={cell.room}
                              onChange={e => handleCellChange(dayIndex, periodIndex, "room", e.target.value)}
                              className="border text-xs p-0.5 px-1 w-full text-center"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center h-full gap-0 px-1">
                            {cell.subject && <span className="text-xs sm:text-sm">{cell.subject}</span>}
                            {cell.room && <strong className="text-xs sm:text-sm">{`[${cell.room}]`}</strong>}
                          </div>
                        )}
                      </td>
                      {/* Break cell after BREAK_AFTER_PERIOD */}
                      {periodIndex === BREAK_AFTER_PERIOD - 1 && (
                        <td className="border bg-gray-50" />
                      )}
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit, Cancel, Clear, and Save buttons fixed at bottom for mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full px-2 py-2 bg-white border-t flex gap-2 z-50">
        {!isEditing ? (
          <button onClick={handleEdit} className="flex-1 bg-blue-500 text-white rounded hover:bg-blue-600 py-2 text-base">
            Edit
          </button>
        ) : (
          <>
            <button onClick={handleCancel} className="flex-1 bg-gray-300 rounded hover:bg-gray-400 py-2 text-base">
              Cancel
            </button>
            <button
              onClick={handleClearClick}
              disabled={isEmpty(tempTimetable)}
              className={`flex-1 rounded py-2 text-white text-base ${isEmpty(tempTimetable) ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
            >
              Clear
            </button>
            <button onClick={handleSave} className="flex-1 bg-green-500 text-white rounded hover:bg-green-600 py-2 text-base">
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timetable;