var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './LicenseFormWebPart.module.scss';
import * as strings from 'LicenseFormWebPartStrings';
var LicenseFormWebPart = /** @class */ (function (_super) {
    __extends(LicenseFormWebPart, _super);
    function LicenseFormWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LicenseFormWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n      <div class=\"" + styles.licenseForm + "\">\n        <label for=\"displayName\">" + strings.lblFormDisplayName + "</label><br/>\n        <input type=\"text\" id=\"displayName\" class=\"" + styles.inputText + "\" disabled value=\"" + escape(this.context.pageContext.user.displayName) + "\"><br/><br/>\n        <label for=\"displayName\">" + strings.lblFormEMail + "</label><br/>\n        <input type=\"text\" id=\"eMail\" class=\"" + styles.inputText + "\" disabled value=\"" + escape(this.context.pageContext.user.email) + "\"><br/><br/>\n        <div id=\"status\"></div>\n        <br>\n        <button id=\"send\" class=\"" + styles.button + "\">" + strings.buttonFormSend + "</button>\n      </div>";
        this._bindEvents();
    };
    LicenseFormWebPart.prototype._bindEvents = function () {
        var _this = this;
        this.domElement.querySelector("#send").addEventListener('click', function () { _this._addListItem(); });
    };
    LicenseFormWebPart.prototype._addListItem = function () {
        console.log(this.properties.targetList);
        var displayName = document.getElementById("displayName")["value"];
        var eMail = document.getElementById("eMail")["value"];
        var statusMessage = this.domElement.querySelector('#status');
        var webUrl = this.context.pageContext.web.absoluteUrl;
        var listAPI = webUrl + "/_api/web/lists/getByTitle('" + this.properties.targetList + "')/items";
        console.log(listAPI);
        var itemBody = {
            "Anzeigename": displayName,
            "EMail": eMail
        };
        var httpOptions = {
            "body": JSON.stringify(itemBody)
        };
        this.context.spHttpClient.post(listAPI, SPHttpClient.configurations.v1, httpOptions)
            .then(function (response) {
            if (response.status === 201) {
                statusMessage.innerHTML = strings.messageFormSendSuccessfully;
                setTimeout(function () {
                    window.location.href = "https://intranet.bfh.ch/BFH/de/Dienste/IT/Software/SW_Kiosk/camtasia_snagit/form_closed/Seiten/default.aspx";
                }, 3000);
            }
            else
                statusMessage.innerHTML = strings.messageFormSendError;
        });
    };
    Object.defineProperty(LicenseFormWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    LicenseFormWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return LicenseFormWebPart;
}(BaseClientSideWebPart));
export default LicenseFormWebPart;
//# sourceMappingURL=LicenseFormWebPart.js.map