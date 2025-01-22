import { UserInfo } from "@entities/User"

export interface ProfileFormState {
  stepOne?: Pick<UserInfo, "cinn" | "inn" | "accountant_phone" | "cfull_name" | "ogrn" | "okved" | "tax_system" | "office_address" | "juridical_address">
  stepTwo?: {

  }
}