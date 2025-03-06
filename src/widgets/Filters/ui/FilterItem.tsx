import { FilterAccordion } from "./FilterAccordion";

interface FilterItemMain {
  onChange?: () => void;
  title?: string;
}

interface FilterItemAdditional {}

type FilterItemProps = FilterItemMain & FilterItemAdditional;

export const FilterItem = ({ onChange, title }: FilterItemProps) => {
  const Component = () => {
    return <></>;
  };
  return <FilterAccordion title={title}>{Component()}</FilterAccordion>;
};
