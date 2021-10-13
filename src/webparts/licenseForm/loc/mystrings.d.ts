declare interface ILicenseFormWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  RedirectUrlFieldLabel: string;
  OperatingSystemsFieldLabel: string;
  lblFormDisplayName: string;
  lblFormEMail: string;
  lblOS: string;
  buttonFormSend: string;
  messageFormSendSuccessfully: string;
  messageFormSendError: string;
}

declare module 'LicenseFormWebPartStrings' {
  const strings: ILicenseFormWebPartStrings;
  export = strings;
}
