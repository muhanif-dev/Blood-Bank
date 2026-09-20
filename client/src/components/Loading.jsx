const Loading = ({ message = 'Finding matching donors...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      {/* Pulsing blood drop */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-error-container flex items-center justify-center animate-pulse">
          <span
            className="material-symbols-outlined text-primary text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            water_drop
          </span>
        </div>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary animate-ping" />
      </div>
      <p className="font-plus-jakarta font-semibold text-[0.875rem] text-on-surface-variant">{message}</p>
    </div>
  );
};

export default Loading;
