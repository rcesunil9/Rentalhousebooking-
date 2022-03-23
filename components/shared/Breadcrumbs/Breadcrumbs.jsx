import React, { Fragment } from "react";
import { BreadcrumbContainer, Links, Separator } from "./style";
import { routes } from "../../../utilities/staticJson";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumbs = () => {
  const crumbsData = useBreadcrumbs(routes);
  const filteredData = crumbsData.filter((content) => {
    return (
      content.key !== "/home" || content.key.includes("/property-details/")
    );
  });
  const lastElement = filteredData.pop();
  return (
    <BreadcrumbContainer className="container">
      {filteredData.map(({ match, breadcrumb }, key) => {
        return (
          <Fragment key={key}>
            <Links href={match.url === "/" ? "/home" : match.url}>
              {breadcrumb}
            </Links>
            <Separator>{">"}</Separator>
          </Fragment>
        );
      })}
      <Separator>{lastElement.breadcrumb}</Separator>
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs;
