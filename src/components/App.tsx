import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImages } from "../services/services";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./Search/SearchBar";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import Modal from "./Modal/Modal";

export const App = () => {
  const [images, setImages] = useState<{ [key: string]: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleLoader = () => {
    setIsLoader((isLoader) => !isLoader);
  };

  //   /*з'єднання пошуку з SearchBar*/
  const handleFormSubmit = (searchName: string) => {
    if (searchQuery === searchName) return;

    setImages([]);
    setSearchQuery(searchName);
    setPage(1);
  };

  //   /*відрісовка зображень по пошуку*/
  useEffect(() => {
    if (!searchQuery) return;

    const getData = async () => {
      try {
        toggleLoader();

        const { hits, total } = await getImages(searchQuery, page);

        if (hits.length < 1)
          toast.error("Sorry, this is not correct. Try it differently");

        setImages((prevState) => [...prevState, ...hits]);
        setIsVisible(page < Math.ceil(total / 12));
      } catch (error) {
        console.log(error);
      } finally {
        toggleLoader();
      }
    };

    getData();
  }, [searchQuery, page]);

  const addNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const openModal = (image: string) => {
    setShowModal(true);
    setContentModal(image);
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setContentModal("");
    document.documentElement.style.overflow = "";
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery pictures={images} onImgClick={openModal} />

      <ToastContainer
        style={{ top: "5em" }}
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
      {isLoader && <Loader />}
      {isVisible && <Button onClickNextPage={addNextPage} />}
      {showModal && (
        <Modal onCloseModal={closeModal}>
          <img src={contentModal} alt={searchQuery} />
        </Modal>
      )}
    </>
  );
};
