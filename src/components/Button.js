import IconPlus from "../assets/plus-icon.svg";

const Button = ({ text, icon, onClick }) => {
  return (
    <button className="button add-button" onClick={onClick}>
      {icon ? <img src={IconPlus} alt="plus" width={16} height={16} /> : ""}
      {text}
    </button>
  );
};

export default Button;
