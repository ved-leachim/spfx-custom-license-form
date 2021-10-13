import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ILicenseFormWebPartProps {
    targetList: string;
    redirectUrl: string;
    operatingSystems: string[];
}
export default class LicenseFormWebPart extends BaseClientSideWebPart<ILicenseFormWebPartProps> {
    private _listOfOS;
    constructor();
    protected get disableReactivePropertyChanges(): boolean;
    render(): void;
    private _bindEvents;
    private _addOSCheckboxes;
    private _addListItem;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=LicenseFormWebPart.d.ts.map