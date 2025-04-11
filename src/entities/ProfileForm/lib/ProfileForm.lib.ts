import FormData from "form-data";
import { FilesToSendType } from "../model/ProfileForm.model";
import { User } from "@entities/User";

export const convertFilesToFormData = (files: FilesToSendType[] | undefined, name = "documents"): FormData => {  
  const formData = new FormData();
    files?.forEach(({file_type, file,file_id}, index)=>{
      formData.append(`${name}[${index}][file_type]`, file_type);
      formData.append(`${name}[${index}][file]`, {
        uri: file?.uri,
        name: file?.name,
        type: file?.type
      })
      if(file_id){
        formData.append(`${name}[${index}][file_id]`, file_id);
      }
    })
return formData;
}

export const convertFilesToUrlParams = (files: User["files"] | undefined, name = "file_id"): URLSearchParams => {  
  const url = new URLSearchParams();
    files?.forEach(({id})=>{
      if(id){
        url.append(`${name}[]`, id);
      }
    })    
return url;
}