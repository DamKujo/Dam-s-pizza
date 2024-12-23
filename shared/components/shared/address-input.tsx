"use client";
import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="4aa16ec515773bb49faf12d7ebf332e68eb2e290"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
