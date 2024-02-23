import { Component } from 'react';
import { fetchImages } from '../../services/imagesApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';
import NotFound from 'components/NotFound';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    query: '',
    images: [],
    largeImage: '',
    isLoading: false,
    totalHits: null,
    page: 1,
    perPage: 12,
    isModal: false,
    error: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.query !== nextProps.query) {
      return { query: nextProps.query, page: 1 };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (
      (prevProps.query !== query && query !== '') ||
      (prevState.page !== page && page !== 1)
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true, error: '' });

    try {
      const data = await fetchImages(query, page);

      if (data.totalHits === 0) {
        throw new Error(`Sorry, no images for ${query}`);
      }

      this.setState(prev => ({
        images: page === 1 ? data.hits : [...prev.images, ...data.hits],
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onChangePage = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  setLargeImg = largeImg => {
    this.setState({ largeImage: largeImg });
  };

  toggleMOdal = () => {
    this.setState(({ isModal }) => ({ isModal: !isModal }));
  };

  render() {
    const {
      images,
      error,
      isLoading,
      perPage,
      page,
      totalHits,
      isModal,
      largeImage,
    } = this.state;
    const totalPage = Math.ceil(totalHits / perPage);

    return (
      <div className={s.galleryWrapper}>
        {' '}
        {error ? (
          <NotFound error={error} />
        ) : (
          <div className={s.ImageGallery}>
            {images.length > 0 &&
              images.map((item, idx) => (
                <ImageGalleryItem
                  key={idx}
                  img={item.webformatURL}
                  setlargeImage={this.setLargeImg}
                  alt={item.tags}
                  id={item.id}
                  showModal={this.toggleMOdal}
                  data={item.largeImageURL}
                />
              ))}
            {isModal && (
              <Modal getLargeImg={largeImage} closeModal={this.toggleMOdal} />
            )}
          </div>
        )}
        {isLoading && <Loader />}
        {totalHits > perPage && totalPage > page && (
          <Button changePage={this.onChangePage} />
        )}
      </div>
    );
  }
}

export default ImageGallery;
