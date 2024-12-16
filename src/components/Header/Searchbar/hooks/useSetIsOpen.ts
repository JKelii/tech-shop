import { useState } from "react";

export const useSetIsOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
};
