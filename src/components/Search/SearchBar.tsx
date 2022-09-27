import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch } from "react-icons/fi";
import { WrapperHeader, Field, BtnSearch } from "./SearchBar.styled";
import styled from "styled-components";

interface IProps {
  onSubmit: (searchName: string) => void;
}

export const SearchBar: FC<IProps> = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchName(value.toLowerCase().trim());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchName === "") {
      toast.warning("Sorry, your field is empty. Enter search name");
      return;
    }
    await onSubmit(searchName);
    setSearchName("");
  };

  return (
    <WrapperHeader>
      <form onSubmit={handleSubmit}>
        <BtnSearch type="submit">
          <IconFI />
        </BtnSearch>
        <Field
          name="searchName"
          type="text"
          autoComplete="off"
          autoFocus
          value={searchName}
          onChange={handleNameChange}
          placeholder="Search images..."
        />
      </form>
    </WrapperHeader>
  );
};

const IconFI = styled(FiSearch)`
  margin-top: 3px;
`;
