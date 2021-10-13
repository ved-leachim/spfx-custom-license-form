import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, IPropertyPaneDropdownOption,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import {escape, set} from '@microsoft/sp-lodash-subset';

import styles from './LicenseFormWebPart.module.scss';
import * as strings from 'LicenseFormWebPartStrings';

import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls";

export interface ILicenseFormWebPartProps {
  targetList: string;
  redirectUrl: string;
  operatingSystems: string[];
}

export default class LicenseFormWebPart extends BaseClientSideWebPart<ILicenseFormWebPartProps> {

  private _listOfOS: IPropertyPaneDropdownOption[] = [];

  constructor() {
    super();

    const listOfOS: string[] = ["Windows", "macOS", "Linux"];

    listOfOS.map((os) => {
      this._listOfOS.push({
      key: os,
      text: os
      });
    });
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public render(): void {

    this.domElement.innerHTML = `
      <div class="${ styles.licenseForm }">
          <label for="displayName">${strings.lblFormDisplayName}</label><br/>
          <input type="text" id="displayName" class="${styles.inputText}" disabled value="${escape(this.context.pageContext.user.displayName)}"><br/><br/>
          <label for="displayName">${strings.lblFormEMail}</label><br/>
          <input type="text" id="eMail" class="${styles.inputText}" disabled value="${escape(this.context.pageContext.user.email)}"><br/><br/>
          <div id="osCheckboxes"></div>
          <div id="status"></div>
          <br>
          <button id="send" class="${styles.button}">${strings.buttonFormSend}</button>
      </div>`;

    this._addOSCheckboxes();
    this._bindEvents();
  }

  private _bindEvents() {
    this.domElement.querySelector("#send").addEventListener('click', () => {this._addListItem();});
  }

  private _addOSCheckboxes() {
    if (this.properties.operatingSystems !== undefined) {
      this.domElement.querySelector("#osCheckboxes").innerHTML = strings.lblOS + "<br/>";
      this.properties.operatingSystems.forEach((os) => {
        this.domElement.querySelector("#osCheckboxes").innerHTML += `
        <input type="radio" id="${os}" name="chooseOS" checked="${true}" value="${os}" required><label for="${os}"> ${os}</label><br/>`;
      });
    }
  }

  private _addListItem() {

    let displayName = document.getElementById("displayName")["value"];
    let eMail = document.getElementById("eMail")["value"];
    let statusMessage = this.domElement.querySelector('#status');
    let selectedOS = (<HTMLInputElement>this.domElement.querySelector('input[name="chooseOS"]:checked')).value;

    const webUrl = this.context.pageContext.web.absoluteUrl;
    const listAPI = webUrl + "/_api/web/lists/getByTitle('" + this.properties.targetList + "')/items";
    console.log(listAPI);
    const itemBody: any = {
      "Anzeigename": displayName,
      "EMail": eMail,
      "Betriebssystem": selectedOS
    };

    const httpOptions: ISPHttpClientOptions = {
      "body": JSON.stringify(itemBody)
    };

    this.context.spHttpClient.post(listAPI, SPHttpClient.configurations.v1, httpOptions)
        .then((response: SPHttpClientResponse) => {
          if (response.status === 201){
            (document.getElementById("send") as HTMLButtonElement).disabled = true;
            (document.getElementById("send") as HTMLButtonElement).style.backgroundColor = "gray";
            (document.getElementById("send") as HTMLButtonElement).style.color = "white";
            statusMessage.innerHTML = strings.messageFormSendSuccessfully;
            if (strings.RedirectUrlFieldLabel !== "") {
              setTimeout(() => {
                window.location.href = this.properties.redirectUrl;
              }, 3000);
            }
          }
          else statusMessage.innerHTML = strings.messageFormSendError;
        });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('targetList', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('redirectUrl', {
                  label: strings.RedirectUrlFieldLabel
                }),
                PropertyFieldMultiSelect('operatingSystems', {
                  key: 'operatingSystems',
                  label: strings.OperatingSystemsFieldLabel,
                  options: this._listOfOS,
                  selectedKeys: this.properties.operatingSystems
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
