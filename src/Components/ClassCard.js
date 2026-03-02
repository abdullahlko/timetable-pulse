import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const ClassCard = ({ title, periodIndex, periodTimes, data, borderColor, cardColor }) => {
  // Checks if the period has a subject scheduled
  const hasSubject = !!data?.subject;

  return (
    <div
      className="flex-1 max-w-sm sm:max-w-md p-4 sm:p-6 border rounded-3xl shadow-md flex flex-col h-[200px]"
      style={{ borderColor }}
    >
      {/* Displays the card title with background color */}
      <div
        className="text-center rounded-b-lg px-2 py-1 mb-4 font-semibold text-sm sm:text-xl"
        style={{ backgroundColor: cardColor }}
      >
        {title}
      </div>

      {/* Class details: subject, room, and period time */}
      {hasSubject ? (
        <div className="flex flex-col flex-1">
          <div className="flex-[1]" />

          {/* Subject and room are grouped, centered */}
          <div className="flex flex-col items-center space-y-1 sm:space-y-2">
            <p className="text-xl sm:text-2xl font-bold text-center">{data.subject}</p>

            {data?.room && (
              <p className="text-sm sm:text-base text-gray-700 font-medium flex items-center gap-1">
                <MeetingRoomIcon fontSize="small" />
                {data.room}
              </p>
            )}
          </div>

          <div className="flex-[2]" />

          {/* Time anchored to bottom as secondary information */}
          {periodIndex !== null && (
            <p className="text-[10px] sm:text-[14px] text-gray-400 text-center font-medium w-full px-2 truncate pb-1">
              {periodTimes[periodIndex]}
            </p>
          )}
        </div>
      ) : (
        // Placeholder display when no subject is scheduled
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl font-bold text-center">&mdash;</p>
        </div>
      )}
    </div>
  );
};

export default ClassCard;