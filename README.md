# custom-license-form

## Summary

The Form is used to replace the old InfoPath Forms on the SP2013 Intranet, which have been mainly used in the "Softwarekiosk".
![alt text](https://github.com/BFH-MS/SPFx---License-Form/blob/main/images/Basic%20License%20Form.png)

#### Camtasia Studio Form for HAFL Students
There has been a request for a new License-Order-Form, so that the HAFL-Students can obtain a Camtasia Studio license for their study work.
The Form is active on the following SPO-Teamsite: https://bernerfachhochschule.sharepoint.com/sites/ws-hafl-camtasiastudierende

## Used SharePoint Framework Version

![version](https://img.shields.io/npm/v/@microsoft/sp-component-base/latest?color=green)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

> A SP-List for storing the license orders.

## Solution

Solution|Author(s)
--------|---------
Basic License Form | Michael Schmitz

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 30, 2021|Initial release

## Minimal Path to Run the Solution

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

## Features

The Form WebPart has a configurable Property which allows the user to define a SP-List as Target for the License-Order.

![alt text](https://github.com/BFH-MS/SPFx---License-Form/blob/main/images/WebPart%20Props.png)

