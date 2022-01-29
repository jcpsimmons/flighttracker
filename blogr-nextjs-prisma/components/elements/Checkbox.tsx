const Checkbox = ({ isChecked, setIsChecked }) => {
  return (
    <div
      className="text-2xl inline-block p-2 m-2 cursor-pointer select-none hover:scale-110 transition-all duration-200"
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked ? "✅" : "⬜️"}
    </div>
  );
};

export default Checkbox;
