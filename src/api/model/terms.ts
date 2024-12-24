export interface ConfigParams {
  moduleName: string;
  groupName: string;
}

export interface TermsConfig {
  [key: string]: {
    [key: string]: {
      title: string;
      url: string;
    };
  }
}