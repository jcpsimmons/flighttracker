const Button = ({ onClick, size = "2xl", children, ...rest }) => {
  return (
    <button
      className={`font-bold text-${size} bg-gray-300 rounded-md p-2 m-2 px-4 shadow-md `}
      {...{ onClick, ...rest }}
    >
      {children}
    </button>
  );
};

export default Button;
