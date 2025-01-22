import { StyleSheet, View } from "react-native";
import {
  DadataCompany,
  DadataResponse,
  useSearchByDadata,
} from "@shared/hooks/useSearchByDadata";
import { useEffect, useState } from "react";
import { Title } from "@shared/ui/Title";
import { Input } from "@shared/ui/Input";
import { Controller, useFormContext } from "react-hook-form";
import { UserInfo } from "@entities/User";
import {
  DATE_MASK,
  NUMBER_MASK,
  SERIE_MASK,
  SNILS_MASK,
} from "@shared/lib/masks";
import { EMAIL_REGEXP, MASK_REGEXP } from "@shared/lib/validation";

export const StepTwo = () => {
  const { setValue, control, watch } = useFormContext<UserInfo>();

  const [department, setDepartment] =
    useState<DadataResponse<DadataCompany> | null>(null);

  const companyType = watch("type");
  const isOOO = companyType === "ООО";

  const [searchCompany, { isLoading: isCompanyLoading }] =
    useSearchByDadata<DadataCompany>("party");

  return (
    <>
      <Title fontWeight="bold" fontSize={16} style={{ marginTop: 24 }}>
        Личные данные {isOOO ? "директора" : ""}
      </Title>
      <View style={styles.inputsContainer}>
        <Controller
          control={control}
          name="series"
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={SERIE_MASK}
              label="Серия паспорта"
              keyboardType="number-pad"
              onChangeText={onChange}
              value={value}
              maxLength={SERIE_MASK.length}
            />
          )}
        />
        <Controller
          control={control}
          name="number"
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={NUMBER_MASK}
              label="Номер паспорта"
              keyboardType="number-pad"
              onChangeText={onChange}
              value={value}
              maxLength={NUMBER_MASK.length}
            />
          )}
        />
        {/* <Controller
          control={control}
          name="number"
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={NUMBER_MASK}
              label="Номер паспорта"
              keyboardType="number-pad"
              onChangeText={onChange}
              value={value}
              maxLength={NUMBER_MASK.length}
            />
          )}
        /> */}
        <Controller
          control={control}
          name="issue_date_at"
          rules={{
            required: "Поле обязательно к заполнению",
            pattern: {
              value: MASK_REGEXP,
              message: "Поле обязательно к заполнению",
            },
            validate: (value) => {
              if (new Date(value) > new Date())
                return "Дата выдачи не может быть позже текущей даты";
              const [day, month, year] = value?.split(".");

              if (Number(day) > 31) return "Неверный формат даты";
              if (Number(month) < 1 || Number(month) > 12)
                return "Неверный формат даты";
              if (Number(year) > new Date().getFullYear())
                return "Год выдачи не должен быть позже текущего года";
              if (Number(year) < 1971)
                return "Год выдачи должен быть не ранее 1970";
              return true;
            },
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={DATE_MASK}
              label="Дата выдачи"
              keyboardType="number-pad"
              onChangeText={onChange}
              value={value}
              maxLength={DATE_MASK.length}
            />
          )}
        />
        <Controller
          control={control}
          name="department"
          rules={{
            required: "",
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              label="Кем выдан"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="snils"
          rules={{
            required: "Поле обязательно к заполнению",
            pattern: {
              value: MASK_REGEXP,
              message: "Некорректное значение поля СНИЛС",
            },
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              label="СНИЛС"
              mask={SNILS_MASK}
              onChangeText={onChange}
              value={value}
              keyboardType="number-pad"
              maxLength={SNILS_MASK.length}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Поле обязательно к заполнению",
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              label="Имя"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="surname"
          rules={{
            required: "Поле обязательно к заполнению",
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              label="Фамилия"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="patronymic"
          rules={{
            required: "Поле обязательно к заполнению",
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              label="Отчество"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="bdate"
          rules={{
            required: "Поле обязательно к заполнению",
            pattern: {
              value: MASK_REGEXP,
              message: "Поле обязательно к заполнению",
            },
            validate: (value) => {
              if (new Date(value) > new Date())
                return "Дата рождения не может быть позже текущей даты";
              const [day, month, year] = value?.split(".");

              if (Number(day) > 31) return "Неверный формат даты";
              if (Number(month) < 1 || Number(month) > 12)
                return "Неверный формат даты";
              if (Number(year) > new Date().getFullYear())
                return "Дата рождения не должна быть позже текущего года";
              return true;
            },
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={DATE_MASK}
              label="Дата рождения"
              keyboardType="number-pad"
              onChangeText={onChange}
              value={value}
              maxLength={DATE_MASK.length}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Поле обязательно к заполнению",
            pattern: {
              value: EMAIL_REGEXP,
              message: "Значение поля не является правильным email адресом",
            },
          }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              label="Email"
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
        {isOOO && (
          <Controller
            control={control}
            name="inn"
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: MASK_REGEXP,
                message: "Некорректный ИНН",
              },
              validate: (value) =>
                value.length === 12 || "ИНН физлица должен содержать 12 цифр",
            }}
            render={({
              formState: { errors },
              field: { value, onChange, name },
            }) => (
              <Input
                type="label"
                label="ИНН"
                keyboardType="number-pad"
                onChangeText={onChange}
                value={value}
                maxLength={12}
              />
            )}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    gap: 16,
    marginTop: 16,
  },
});
