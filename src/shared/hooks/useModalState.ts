import { useCallback, useState } from "react"

export const useModalState = (defaultValue?: boolean)=>{
  const [isOpen, setIsOpen] = useState(!!defaultValue);
  
  const openModal = useCallback(()=>{
    setIsOpen(true)
  }, []);

  const closeModal = useCallback(()=>{
    setIsOpen(false)
  }, []);

  return [isOpen, openModal, closeModal] as const;
}