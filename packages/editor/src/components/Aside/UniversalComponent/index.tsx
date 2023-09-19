import { useSelector } from "react-redux";
import LibraryItem from "./component/LibItem/libItem";
import { libraryMap } from "../../../../../library/index";
import { Fragment } from "react";
import "./style.scss";

const App = () => {
  const count: number = useSelector(
    (state: any) => state.tickTack.contentData.length
  );
  const genericComponent =
    libraryMap &&
    Object.keys(libraryMap).map((item, index) => {
      return (
        <Fragment key={`${item}${index}`}>
          <LibraryItem props={libraryMap[item]} index={count}></LibraryItem>
        </Fragment>
      );
    });
  return <div className="tt-component-container">{genericComponent}</div>;
};
export default App;
