import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ img, alt, data, setlargeImage, showModal }) => {
  const handleClick = e => {
    setlargeImage(e.currentTarget.dataset.large);
    showModal();
  };
  return (
    <li className={s.ImageGalleryItem} onClick={handleClick} data-large={data}>
      <img className={s.itemImg} src={img} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
