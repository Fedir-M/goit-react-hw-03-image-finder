import { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeForEsc);
  }

  closeForEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeForEsc);
  }
  closeModal = e => {
    if (e.currentTarget !== e.target) {
      this.props.closeModal();
    }
  };
  render() {
    const { getLargeImg } = this.props;

    return (
      <div className={s.overlay} onClick={this.closeModal}>
        <div className={s.modalWrapper}>
          <img className={s.largeImg} src={getLargeImg} alt="Big img" />
        </div>
      </div>
    );
  }
}

export default Modal;
