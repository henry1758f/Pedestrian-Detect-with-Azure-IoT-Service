# SYNNEX_SW_Demo

## What are these Demostrations ?
### 1. crossroad_pedestrian_demo
  This demo is based on intel OpenVINO demo [Crossroad Camera C++ Demo](https://docs.openvinotoolkit.org/latest/_demos_crossroad_camera_demo_README.html).This demo provides an inference pipeline for persons' detection, recognition and reidentification. The demo uses Person Detection network followed by the Person Attributes Recognition and Person Reidentification Retail networks applied on top of the detection results.  
  
  **Additionally inpletement with some feature**
  1. Auto capture pedestrians picture of each reidentified person
  2. Realtime update the information like location, attributes and picture of each person been detected.
  3. Remote monitoring by using Azure IoT Hub.
  4. Person detection, recognition and reidentification. 

## How to Setup these Demostartions ?
### Quick Deploy
TO BE DONE.
### Normal Setup
#### 1. crossroad_pedestrian_demo
* Linux Setup
   * ##### Install OpenVINO Toolkits
   Follow the install guide from [Intel OpenVINO website](https://docs.openvinotoolkit.org/latest/_docs_install_guides_installing_openvino_linux.html)
   
   * ##### Clone this repository
   
          cd ~
          git clone https://github.com/henry1758f/SYNNEX_SW_Demo.git
   
   * ##### Build the demo code
          
          ./build/build_demos.sh
    
   * ##### Excuted the demo
   
   ##### If you want to try remote monitoring with Azure IoT Hub, You have to 
   * ##### Install Node.js
    
          curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
          sudo apt-get install -y nodejs
   
   * ##### Install some needed packages
   
          cd crossroad_pedestrian_demo
          npm install
   
   * ##### [Create an IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/quickstart-send-telemetry-node#create-an-iot-hub) 
   * ##### [Associate an Azure Storage account to IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-csharp-file-upload#associate-an-azure-storage-account-to-iot-hub)
   * ##### Create a new file to save your connection string
   ###### Create a file named "connectString.string" , then put your connection string to this file and saved. (The string file must be saved to where you're going to excute the demo.)
   
  
  
