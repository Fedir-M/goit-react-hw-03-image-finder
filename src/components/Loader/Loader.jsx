import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <span className={s.loaderName}></span>
    </div>
  );
};

export default Loader;
