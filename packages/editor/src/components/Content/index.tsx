import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
// import * as Antd from 'antd'
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { libraryPropsMap } from "@ticktack/library";
import {
  ExportJson,
  LibraryComponentInstanceData,
} from "@ticktack/types/src/library-component";
import { storeData } from "@tickTack/types/src/store";
import { DragProp } from "@ticktack/types/src/drop-drag";
import { addComponent, initChildUuid } from "@/store/features/counterSlice";
import {GenerateChildenComponent} from '../../../factory/index'
import "./style.scss";

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const contentData: LibraryComponentInstanceData[] = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );
  const length = contentData.length;
  const [index, setIndex] = useState<number>(length);
  const [container, setContainer] = useState(""); // 放置的容器信息
  const indexRef = useRef(index);
  const containerRef = useRef(container);
  const [whoElement] = useState(false);
  const whoElementRef = useRef(whoElement);

  const handleItem = (item: ExportJson): LibraryComponentInstanceData => {
    let prop;
    for (const propName in libraryPropsMap) {
      if (propName === item.componentData.name) {
        prop = libraryPropsMap[propName];
      } else {
        continue;
      }
    }
    const uuid = uuidv4();
    const res = {
      uuid: uuid,
      componentName: item.componentData.name, // 组件名称，可以用来对应展示区应该出现的组件
      libraryName: item.componentData.libraryName,
      focus: false,
      props: prop,
      child: item.componentData.child,
      children: [],
    };
    return res;
  };

  // 拖动展示区中的元素的时候会触发
  useEffect(() => {
    indexRef.current = index;
    containerRef.current = container;
    whoElementRef.current = whoElement;
  }, [index, container, whoElement]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [DragProp.SORT],
      hover: () => {
        setContainer("");
      },
      drop: (data: { props: ExportJson; index: number }, monitor) => {
        console.log(isOver, monitor.getDropResult());
        const _item = handleItem(data.props);
        setIndex(0); // fix: 每次拖动结束之后index更新为0
        setContainer(""); // fix: 每次拖动结束之后container更新为空
        dispatch(initChildUuid()); // 初始化childUuid
        if (containerRef.current !== "Slot") {
          console.log(containerRef.current, "container");
          dispatch(
            addComponent({ componentJson: _item, index: indexRef.current })
          );
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  return (
    <>
      <div className='container container-content' ref={drop}>
        {contentData.length > 0 &&
          contentData.map((item) => {
            return (
              <Fragment key={`${item}${item.componentName}${item.uuid}`}>
                <GenerateChildenComponent {...item}></GenerateChildenComponent>
              </Fragment>
            )
            })}
      </div>
    </>
  );
};

export default Content;
