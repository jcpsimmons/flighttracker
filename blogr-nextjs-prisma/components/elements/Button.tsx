const Button = ({ onClick, children }) => {
  return (
    <div>
      <button {...{ onClick }}>{children}</button>
    </div>
  );
};

export default Button;
