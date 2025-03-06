import { UserDoc, UserDocType } from "@entities/UserDoc";
import { useGetUserDocsQuery } from "@entities/UserDoc/model/UserDoc.api";
import { ArrowDownIcon } from "@images/svg/ArrowDownIcon";
import { DocIcon } from "@images/svg/DocIcon";
import { SortIcon } from "@images/svg/SortIcon";
import { useModalState } from "@shared/hooks/useModalState";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { Button } from "@shared/ui/Button";
import { InfoBlock } from "@shared/ui/InfoBlock";
import { SelectOptions } from "@shared/ui/Select";
import { TabLink } from "@shared/ui/TabLink";
import { TextFieldModal } from "@shared/ui/TextFileldModal";
import { Title } from "@shared/ui/Title";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

const documentFilters: Record<string, string> = {
  "1": "Договор",
  "2": "Заявка",
  "3": "Акт",
};

const documentSort = [
  { label: "Сначала новые", value: "new" },
  { label: "Сначала старые", value: "old" },
  { label: "Подписанные", value: "sign" },
  { label: "Не подписанные", value: "unsign" },
];

export const UserDocsPage = () => {
  const { data: docs } = useGetUserDocsQuery();

  const pathname = usePathname();
  const params = useLocalSearchParams();
  const [isOpen, openPopup, closePopup] = useModalState();
  const [sort, setSort] = useState<string>();

  const filteredAndSortedDocs = useMemo<UserDocType[]>(() => {
    if (!docs?.length) return [];
    let filteredDocs = docs;

    if (typeof params?.docFilter === "string") {
      filteredDocs = docs.filter(
        (item) => item.type === documentFilters[params.docFilter as string]
      );
    }

    if (sort) {
      switch (sort) {
        case "new": {
          filteredDocs.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          break;
        }
        case "old": {
          filteredDocs.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
          break;
        }
        case "sign": {
          filteredDocs.sort((a, b) =>
            a.is_signed === b.is_signed ? 0 : a.is_signed ? -1 : 1
          );
          break;
        }
        case "unsign": {
          filteredDocs.sort((a, b) =>
            a.is_signed === b.is_signed ? 0 : a.is_signed ? 1 : -1
          );
          break;
        }
      }
    }
    return filteredDocs;
  }, [docs]);

  const onSortSelect = (item: (typeof documentSort)[number]) => {
    setSort(item.value);
    closePopup();
  };

  return (
    <>
      <TextFieldModal isOpen={isOpen} onClose={closePopup}>
        <SelectOptions
          noPadding
          optionText={(item) => item.label}
          options={documentSort}
          keyExtractor={(item) => item.value}
          onSelect={onSortSelect}
          selectedOption={(item) => item.value === sort}
        />
      </TextFieldModal>
      <View style={styles.wrapper}>
        <View style={styles.tabs}>
          <TabLink href={pathname} activeCondition={!params?.docFilter}>
            Все
          </TabLink>
          {Object.entries(documentFilters).map(([key, value]) => (
            <TabLink
              href={`${pathname}?docFilter=${key}`}
              activeCondition={params?.docFilter === key}
            >
              {value.endsWith("а") ? value.slice(0, -1) + "и" : value + "ы"}
            </TabLink>
          ))}
          <Button style={styles.button} onPress={openPopup}>
            <SortIcon height={24} width={24} />
          </Button>
        </View>
        {filteredAndSortedDocs.length ? (
          filteredAndSortedDocs.map(({ id, ...props }) => (
            <UserDoc key={id} id={id} {...props} />
          ))
        ) : (
          <View style={styles.emptyBlock}>
            <InfoBlock
              title="Нет подгруженных документов"
              style={{ main: { gap: 0 }, title: { marginTop: 4 } }}
              icon={<DocIcon width={46} height={47} />}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 16,
    marginTop: 24,
    flex: 1,
  },
  button: {
    borderRadius: 12,
    width: 36,
    height: 36,
    backgroundColor: COLORS.specialGrey2,
    marginLeft: "auto",
  },
  tabs: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  emptyBlock: {
    flex: 1,
    justifyContent: "center",
  },
});
