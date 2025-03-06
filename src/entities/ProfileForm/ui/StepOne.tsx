import { StyleSheet, View } from "react-native";
import { CheckBox } from "@shared/ui/CheckBox";
import { useToggleState } from "@shared/hooks/useToggleState";
import {
  DadataAddress,
  DadataCompany,
  DadataResponse,
  useSearchByDadata,
} from "@shared/hooks/useSearchByDadata";
import { useEffect, useState } from "react";
import { Title } from "@shared/ui/Title";
import { Select, SelectOptions } from "@shared/ui/Select";
import { Input } from "@shared/ui/Input";
import { Controller, useFormContext } from "react-hook-form";
import { UserInfo } from "@entities/User";
import { PHONE_MASK } from "@shared/lib/masks";
import { useGetTaxSystemsQuery } from "../model/ProfileForm.api";
import { ProfileForm } from "../model/ProfileForm.model";

export const StepOne = () => {
  const [addressCheckBox, toggleAddressCheckBox] = useToggleState(true);
  const { data: taxSystems, isLoading: isTaxSystemLoading } =
    useGetTaxSystemsQuery();

  const { setValue, control, watch } = useFormContext<ProfileForm>();

  const [company, setCompany] = useState<DadataResponse<DadataCompany> | null>(
    null
  );

  const ogrn = watch("ogrn");
  const cinn = watch("cinn");
  const short_name = watch("short_name");
  const okved = watch("okved");
  const juridical_address = watch("juridical_address");

  useEffect(() => {
    if (!company) return;
    const companyData = company.data;
    const companyType = companyData.type === "LEGAL" ? "ООО" : "ИП";
    const companyRegion =
      companyData.address.data.region_type_full.toLocaleLowerCase() === "город"
        ? companyData.address.data.region
        : companyData.address.data.region +
          " " +
          companyData.address.data.region_type_full.charAt(0).toUpperCase() +
          companyData.address.data.region_type_full.slice(1).toLowerCase();

    setValue("cinn", companyData.inn ?? "");
    setValue("ogrn", companyData.ogrn ?? "");
    setValue("okved", companyData.okved ?? "");
    setValue("short_name", company.value);
    setValue("type", companyType);
    setValue("juridical_address", companyData.address.value ?? "");
    setValue("full_name", companyData.name.full_with_opf);
    setValue("cregion", companyRegion.split(" ")[0]);
    setValue("region", companyRegion);

    if (companyType === "ИП") {
      setValue("name", companyData.fio.name ?? "");
      setValue("patronymic", companyData.fio.patronymic ?? "");
      setValue("surname", companyData.fio.surname ?? "");
      setValue("inn", companyData.inn ?? "");
    }

    if (companyType === "ООО") {
      const [surname, name, patronymic] =
        companyData.management.name?.split(" ") ?? [];
      setValue("inn", "");
      setValue("name", name ?? "");
      setValue("patronymic", patronymic ?? "");
      setValue("surname", surname ?? "");
      setValue("kpp", companyData.kpp ?? "");
    }
  }, [company]);

  useEffect(() => {
    if (addressCheckBox) {
      setValue("office_address", juridical_address);
    }
  }, [addressCheckBox, juridical_address]);

  const [searchCompany, { isLoading: isCompanyLoading }] =
    useSearchByDadata<DadataCompany>("party");

  const [searchAddress, { isLoading: isAddressLoading }] =
    useSearchByDadata<DadataAddress>("address");

  return (
    <>
      <Title fontWeight="bold" fontSize={16} style={{ marginTop: 24 }}>
        Информация о компании
      </Title>
      <View style={styles.inputsContainer}>
        <Controller
          rules={{ required: "Поле обязательно к заполнению" }}
          control={control}
          name="cinn"
          render={({ field: { name }, formState: { errors } }) => (
            <Select
              type="async"
              label="ИНН"
              inputKeyboard="number-pad"
              onSearch={searchCompany}
              value={cinn ?? ""}
              setValue={(item) => setCompany(item ?? null)}
              error={errors[name]?.message}
            >
              {(items, onSelect) => (
                <SelectOptions
                  options={items}
                  keyExtractor={(item) => item.data.inn ?? item.value}
                  optionText={(item) => item.value}
                  onSelect={onSelect}
                />
              )}
            </Select>
          )}
        />
        <Select
          type="search"
          options={[]}
          label="Название организации"
          value={short_name ?? ""}
          disabled
        />
        <Select
          options={[]}
          type="search"
          label="ОГРН"
          disabled
          value={ogrn ?? ""}
        />
        <Select
          type="search"
          options={[]}
          label="Основной ОКВЭД"
          value={okved ?? ""}
          disabled
        />
        <Controller
          control={control}
          name="tax_system"
          rules={{
            required: "Поле обязательно к заполнению",
          }}
          render={({
            field: { value, onChange, name },
            formState: { errors },
          }) => (
            <Select
              type="search"
              label="Система налогооблажения"
              options={taxSystems ?? []}
              value={value}
              setValue={onChange}
              error={errors[name]?.message}
            >
              {(items, onSelect) => (
                <SelectOptions
                  options={items}
                  keyExtractor={(item) => item}
                  optionText={(item) => item}
                  onSelect={onSelect}
                />
              )}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="accountant_phone"
          rules={{ required: "Поле обязательно к заполнению" }}
          render={({
            formState: { errors },
            field: { value, onChange, name },
          }) => (
            <Input
              type="label"
              mask={PHONE_MASK}
              label="Номер телефона бухгалтера"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
              maxLength={PHONE_MASK.length}
              isModal
              error={errors[name]?.message}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: "Поле обязательно к заполнению",
          }}
          name="juridical_address"
          render={({
            field: { value, name, onChange },
            formState: { errors },
          }) => (
            <Select
              type="async"
              label="Юридический адрес"
              onSearch={searchAddress}
              value={value}
              setValue={(item) => onChange(item?.value ?? "")}
              error={errors[name]?.message}
            >
              {(items, onSelect) => (
                <SelectOptions
                  options={items}
                  keyExtractor={(item) => item.value}
                  optionText={(item) => item.value}
                  onSelect={onSelect}
                />
              )}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="office_address"
          rules={{
            required: "Поле обязательно к заполнению",
          }}
          render={({
            field: { value, name, onChange },
            formState: { errors },
          }) => (
            <Select
              type="async"
              label="Фактический адрес"
              onSearch={searchAddress}
              value={value}
              setValue={(item) => onChange(item?.value ?? "")}
              disabled={addressCheckBox}
              error={errors[name]?.message}
            >
              {(items, onSelect) => (
                <SelectOptions
                  options={items}
                  keyExtractor={(item) => item.value}
                  optionText={(item) => item.value}
                  onSelect={onSelect}
                />
              )}
            </Select>
          )}
        />
      </View>
      <CheckBox
        style={{ marginTop: 16 }}
        isChecked={addressCheckBox}
        onChange={toggleAddressCheckBox}
      >
        Фактический адрес совпадает с юридическим
      </CheckBox>
    </>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    gap: 16,
    marginTop: 16,
  },
});
