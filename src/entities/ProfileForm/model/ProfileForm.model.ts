import { UserInfo } from "@entities/User"

export interface ProfileFormState {
  stepOne?: Pick<UserInfo, "cinn" | "inn" | "accountant_phone" | "cfull_name" | "ogrn" | "okved" | "tax_system" | "office_address" | "juridical_address">
  stepTwo?: {

  }
}

export const GENDER_OPTIONS = [
  { name: "Мужской", value: "M" },
  { name: "Женский", value: "F" },
];

export interface FileType {
  uri: string
  type: string
  name: string
}

export interface FilesToSendType {
  file?: FileType;
  file_type: string;
  file_id?: string;
}

export interface ProfileForm extends Omit<UserInfo, "gender"> {
  avatar?: FileType,
  gender: (typeof GENDER_OPTIONS)[number];
  files?: FilesToSendType[];
}

export const INVALID_DOCUMENTS = ["Акт", "Заявка", "Договор", "Аватар"];