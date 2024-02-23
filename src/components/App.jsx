import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css';

export class App extends Component {
  state = {
    query: '',
  };

  changeQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.changeQuery} />
        <ImageGallery query={this.state.query} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}
