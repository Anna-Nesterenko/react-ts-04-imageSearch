import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import styled from "styled-components";
import { FC } from "react";

interface IPropsGallery {
  pictures: { [key: string]: string }[];
  onImgClick: (contentModal: string) => void;
}

export const ImageGallery: FC<IPropsGallery> = ({ pictures, onImgClick }) => {
  return (
    <Gallery>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onOpenImg={onImgClick}
          tags={tags}
        />
      ))}
    </Gallery>
  );
};

const Gallery = styled.ul`
  margin: 75px auto 15px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, max-content));
  grid-gap: 20px;
`;
