import errorImg from '../../img/photo_2024-02-22_12-34-57.jpg';

import s from './NotFound.module.css';

const NotFound = ({ error }) => {
  return (
    <div className={s.errorWrapper}>
      <h2>{error}</h2>
      <img className={s.errorImg} src={errorImg} alt="Not Found" />
    </div>
  );
};

export default NotFound;
