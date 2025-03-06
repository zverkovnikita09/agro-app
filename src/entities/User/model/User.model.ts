
export type ModerationStatus = "approved" | "pending" | "rejected";

export interface MainOrganizationInfo {
  type?: "ИП" | "ООО"
  inn: string
  ogrn: string
  okved: string
  region: string
  accountant_phone: string
  director_name: string
  director_surname: string
  director_lastname: string
  short_name: string
  full_name: string
  juridical_address: string
  office_address: string
  tax_system: string
  cinn: string
  cshort_name: string
  cfull_name: string
  cregion: string
  kpp: string
}

export interface PersonalData {
  series: string
  number: string
  name: string
  surname: string
  patronymic: string
  department: string
  snils: string
  issue_date_at: string
  department_code: string
  email: string
  gender: string
  bdate: string
  moderation_status: ModerationStatus;
}

export type UserInfo = MainOrganizationInfo & PersonalData;

export interface UserFiles {
  type: string;
  id: string;
  path_url: string;
}

export interface User extends UserInfo {
  id: string;
  phone_number: string;
  files?: UserFiles[];
}