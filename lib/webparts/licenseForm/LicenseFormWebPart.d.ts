import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ILicenseFormWebPartProps {
    targetList: string;
    redirectUrl: string;
}
export default class LicenseFormWebPart extends BaseClientSideWebPart<ILicenseFormWebPartProps> {
    render(): void;
    private _bindEvents;
    private _addListItem;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=LicenseFormWebPart.d.ts.map