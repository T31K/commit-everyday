function ColorPicker({ activeColor, setActiveColor }) {
  return (
    <div className=" flex gap-1">
      <div
        className={`bg-rose-300 w-[30px] h-[30px] rounded-[10px] border-2 ${
          activeColor == 'rose' ? 'border-slate-400' : 'border-rose-300'
        }`}
        onClick={() => setActiveColor('rose')}
      />

      <div
        className={`bg-emerald-300 w-[30px] h-[30px] rounded-[10px] border-2 ${
          activeColor == 'emerald' ? 'border-slate-400' : 'border-emerald-300'
        }`}
        onClick={() => setActiveColor('emerald')}
      />
      <div
        className={`bg-blue-300 w-[30px] h-[30px] rounded-[10px] border-2 ${
          activeColor == 'blue' ? 'border-slate-400' : 'border-blue-300'
        }`}
        onClick={() => setActiveColor('blue')}
      />
      <div
        className={`bg-violet-300 w-[30px] h-[30px] rounded-[10px] border-2 ${
          activeColor == 'violet' ? 'border-slate-400' : 'border-violet-300'
        }`}
        onClick={() => setActiveColor('violet')}
      ></div>
    </div>
  );
}

export default ColorPicker;
