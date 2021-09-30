declare interface ILicenseFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  lblFormDisplayName: string;
  lblFormEMail: string;
  buttonFormSend: string;
  messageFormSendSuccessfully: string;
  messageFormSendError: string;
}

declare module 'LicenseFormWebPartStrings' {
  const strings: ILicenseFormWebPartStrings;
  export = strings;
}
