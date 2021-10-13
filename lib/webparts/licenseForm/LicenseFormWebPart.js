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
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls";
var LicenseFormWebPart = /** @class */ (function (_super) {
    __extends(LicenseFormWebPart, _super);
    function LicenseFormWebPart() {
        var _this = _super.call(this) || this;
        _this._listOfOS = [];
        var listOfOS = ["Windows", "macOS", "Linux"];
        listOfOS.map(function (os) {
            _this._listOfOS.push({
                key: os,
                text: os
            });
        });
        return _this;
    }
    Object.defineProperty(LicenseFormWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    LicenseFormWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n      <div class=\"" + styles.licenseForm + "\">\n          <label for=\"displayName\">" + strings.lblFormDisplayName + "</label><br/>\n          <input type=\"text\" id=\"displayName\" class=\"" + styles.inputText + "\" disabled value=\"" + escape(this.context.pageContext.user.displayName) + "\"><br/><br/>\n          <label for=\"displayName\">" + strings.lblFormEMail + "</label><br/>\n          <input type=\"text\" id=\"eMail\" class=\"" + styles.inputText + "\" disabled value=\"" + escape(this.context.pageContext.user.email) + "\"><br/><br/>\n          <div id=\"osCheckboxes\"></div>\n          <div id=\"status\"></div>\n          <br>\n          <button id=\"send\" class=\"" + styles.button + "\">" + strings.buttonFormSend + "</button>\n      </div>";
        this._addOSCheckboxes();
        this._bindEvents();
    };
    LicenseFormWebPart.prototype._bindEvents = function () {
        var _this = this;
        this.domElement.querySelector("#send").addEventListener('click', function () { _this._addListItem(); });
    };
    LicenseFormWebPart.prototype._addOSCheckboxes = function () {
        var _this = this;
        if (this.properties.operatingSystems !== undefined) {
            this.domElement.querySelector("#osCheckboxes").innerHTML = strings.lblOS + "<br/>";
            this.properties.operatingSystems.forEach(function (os) {
                _this.domElement.querySelector("#osCheckboxes").innerHTML += "\n        <input type=\"radio\" id=\"" + os + "\" name=\"chooseOS\" checked=\"" + true + "\" value=\"" + os + "\" required><label for=\"" + os + "\"> " + os + "</label><br/>";
            });
        }
    };
    LicenseFormWebPart.prototype._addListItem = function () {
        var _this = this;
        var displayName = document.getElementById("displayName")["value"];
        var eMail = document.getElementById("eMail")["value"];
        var statusMessage = this.domElement.querySelector('#status');
        var selectedOS = this.domElement.querySelector('input[name="chooseOS"]:checked').value;
        var webUrl = this.context.pageContext.web.absoluteUrl;
        var listAPI = webUrl + "/_api/web/lists/getByTitle('" + this.properties.targetList + "')/items";
        console.log(listAPI);
        var itemBody = {
            "Anzeigename": displayName,
            "EMail": eMail,
            "Betriebssystem": selectedOS
        };
        var httpOptions = {
            "body": JSON.stringify(itemBody)
        };
        this.context.spHttpClient.post(listAPI, SPHttpClient.configurations.v1, httpOptions)
            .then(function (response) {
            if (response.status === 201) {
                document.getElementById("send").disabled = true;
                document.getElementById("send").style.backgroundColor = "gray";
                document.getElementById("send").style.color = "white";
                statusMessage.innerHTML = strings.messageFormSendSuccessfully;
                if (strings.RedirectUrlFieldLabel !== "") {
                    setTimeout(function () {
                        window.location.href = _this.properties.redirectUrl;
                    }, 3000);
                }
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
    };
    return LicenseFormWebPart;
}(BaseClientSideWebPart));
export default LicenseFormWebPart;
//# sourceMappingURL=LicenseFormWebPart.js.map