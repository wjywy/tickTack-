import "./App.css";
// import libraryTree, { libraryMap, libraryRecord } from "../index";
import { libraryComponents, libraryPropsMap } from "../index";

function App() {
  // console.log(libraryTree, "libraryTree");
  console.log(libraryComponents, "libraryComponent"); // 返回的对象中第一个字段为路径
  console.log(libraryPropsMap, "libraryPropsMap");
  // console.log(libraryRecord, "libraryRecord");
  return (
    <>
      <div>button</div>
    </>
  );
}

export default App;
