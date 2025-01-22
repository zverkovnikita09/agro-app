import { ViewProps } from "react-native";
import { CardContainer } from "../../../shared/ui/CardContainer";
import { CloseButton } from "../../../shared/ui/CloseButton";
import { ApplicationContentExpanded } from "./ApplicationContentExpanded";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationsSelectors } from "../model/Applications.selectors";
import { clearSelectedApplication } from "../model/Applications.slice";
import { COLORS } from "@shared/lib/styles";
import { ApplicationContent } from "./ApplicationContent";
import { useEffect, useState } from "react";

export const SelectedApplications = ({ style, ...props }: ViewProps) => {
  const selectedApplications = useSelector(
    ApplicationsSelectors.selectSelectedApplications
  );

  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsExpanded(false);
  }, [selectedApplications]);

  if (!selectedApplications.length) return null;

  if (!isExpanded) {
    return (
      <CardContainer
        style={[{ backgroundColor: COLORS.white }, style]}
        {...props}
      >
        <CloseButton
          style={{ position: "absolute", right: 8, top: 8, zIndex: 3 }}
          onPress={() => dispatch(clearSelectedApplication())}
        />
        {selectedApplications.map((application) => (
          <ApplicationContent
            toggleIsExpanded={() => setIsExpanded(true)}
            {...application}
            key={application.id}
          />
        ))}
      </CardContainer>
    );
  }

  return (
    <CardContainer
      style={[{ backgroundColor: COLORS.white }, style]}
      {...props}
    >
      <CloseButton
        style={{ position: "absolute", right: 16, top: 16, zIndex: 3 }}
        onPress={() => dispatch(clearSelectedApplication())}
      />
      {selectedApplications.map((application) => (
        <ApplicationContentExpanded {...application} key={application.id} />
      ))}
    </CardContainer>
  );
};
