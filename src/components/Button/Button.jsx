import s from './Button.module.css';

const Button = ({ changePage }) => {
  return (
    <div>
      <button className={s.button} type="button" onClick={changePage}>
        Load More
      </button>
    </div>
  );
};

export default Button;
