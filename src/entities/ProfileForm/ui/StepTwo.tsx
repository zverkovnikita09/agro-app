import { StyleSheet, View } from "react-native";
import { DadataFMS, useSearchByDadata } from "@shared/hooks/useSearchByDadata";
import { useEffect, useState } from "react";
import { Title } from "@shared/ui/Title";
import { Input } from "@shared/ui/Input";
import { Controller, useFormContext } from "react-hook-form";
import {
  DATE_MASK,
  NUMBER_MASK,
  SERIE_MASK,
  SNILS_MASK,
} from "@shared/lib/masks";
import { EMAIL_REGEXP, MASK_REGEXP } from "@shared/lib/validation";
import { Select, SelectOptions } from "@shared/ui/Select";
import { GENDER_OPTIONS, ProfileForm } from "../model/ProfileForm.model";
import { isIOS } from "@shared/lib/checkPlatform";

export const StepTwo = () => {
  const { setValue, control, watch } = useFormContext<ProfileForm>();

  const [department, setDepartment] = useState<DadataFMS | null>(null);

  const [searchDepartment, { isLoading: isDepartmentLoading }] =
    useSearchByDadata<DadataFMS>("fms_unit");

  const departmentCode = watch("department_code");

  const companyType = watch("type");
  const isOOO = companyType === "ООО";

  useEffect(() => {
    if (!department) return;
    setValue("department_code", department.code ?? "");
    setValue("department", department.name ?? "");
  }, [department]);

  return (
    <>
      <Title fontWeight="bold" fontSize={16} style={{ marginTop: 24 }}>
        Личные данные {isOOO ? "директора" : ""}
      </Title>
      <View style={styles.inputsContainer}>
        <Controller
          control={control}
          name="series"
          rules={{ required: "Поле обязательно к заполнению" }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={SERIE_MASK}
              label="Серия паспорта"
              keyboardType={isIOS ? "numbers-and-punctuation" : "number-pad"}
              onChangeText={onChange}
              value={value}
              maxLength={SERIE_MASK.length}
              isModal
              error={errors[name]?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="number"
          rules={{ required: "Поле обязательно к заполнению" }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={NUMBER_MASK}
              label="Номер паспорта"
              keyboardType={isIOS ? "numbers-and-punctuation" : "number-pad"}
              onChangeText={onChange}
              value={value}
              maxLength={NUMBER_MASK.length}
              isModal
              error={errors[name]?.message}
            />
          )}
        />
        <Controller
          rules={{ required: "Поле обязательно к заполнению" }}
          control={control}
          name="department_code"
          render={({ field: { name }, formState: { errors } }) => (
            <Select
              type="async"
              label="Код подразделения"
              inputKeyboard="number-pad"
              onSearch={searchDepartment}
              value={departmentCode ?? ""}
              setValue={(item) => setDepartment(item?.data ?? null)}
              error={errors[name]?.message}
            >
              {(items, onSelect) => (
                <SelectOptions
                  options={items}
                  keyExtractor={(item) => `${item.data.code}${item.data.name}`}
                  optionText={(item) => item.value}
                  onSelect={onSelect}
                />
              )}
            </Select>
          )}
        />
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
              keyboardType={isIOS ? "numbers-and-punctuation" : "number-pad"}
              onChangeText={onChange}
              value={value}
              maxLength={DATE_MASK.length}
              isModal
              error={errors[name]?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="department"
          rules={{ required: "Поле обязательно к заполнению" }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              label="Кем выдан"
              onChangeText={onChange}
              value={value}
              multiline
              isModal
              error={errors[name]?.message}
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
              keyboardType={isIOS ? "numbers-and-punctuation" : "number-pad"}
              maxLength={SNILS_MASK.length}
              isModal
              error={errors[name]?.message}
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
              isModal
              error={errors[name]?.message}
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
              isModal
              error={errors[name]?.message}
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
              isModal
              error={errors[name]?.message}
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
              keyboardType={isIOS ? "numbers-and-punctuation" : "number-pad"}
              onChangeText={onChange}
              value={value}
              maxLength={DATE_MASK.length}
              isModal
              error={errors[name]?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="gender"
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Select
              setValue={(item) => onChange(item)}
              value={value.name}
              label="Пол"
              options={GENDER_OPTIONS}
              isModal
              error={errors[name]?.message}
            >
              {(items, onSelect) => (
                <SelectOptions
                  noPadding
                  options={items}
                  selectedOption={(item) => item.value === value.value}
                  keyExtractor={(item) => item.name}
                  optionText={(item) => item.name}
                  onSelect={onSelect}
                />
              )}
            </Select>
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
              isModal
              error={errors[name]?.message}
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
                keyboardType={isIOS ? "numbers-and-punctuation" : "number-pad"}
                onChangeText={onChange}
                value={value}
                maxLength={12}
                isModal
                error={errors[name]?.message}
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
