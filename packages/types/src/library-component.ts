import { LibraryPanelTabEnum } from "./panel";

export type LibraryComponentInstanceProps = Record<string, unknown>;

export type DefineComponent = () => JSX.Element;

export type TabName = "form" | "show" | "container";

export type tickType = "container" | "generics";

export interface LibraryComponent {
  name: string;

  libraryName: LibraryPanelTabEnum;

  tickType: string;

  tabName: string;

  order: number;

  libraryPanelShowDetail: {
    title: string;
    content: string;
  };

  tips: {
    title: string;

    content: string;

    preview?: DefineComponent;
  };
}

/**
 * 物料组件定义（右侧控制台）
 */
export interface LibraryComponentInstanceData {
  indexId: string;

  uuid: Readonly<string>;

  focus: boolean;

  libraryName: Readonly<LibraryPanelTabEnum>;

  componentName: Readonly<string>;

  props?: LibraryComponentInstanceProps;

  //   eventTriggers?: LibraryComponentInstanceEventTriggers;

  children?: LibraryComponentInstanceData[];
}