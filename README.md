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
          cd $HOME/SYNNEX_SW_Demo/build
          ./build_demos.sh
          
   * ##### Download NN Models
        The Demo needs three pre-trained models for inference
        1. [person-vehicle-bike-detection-crossroad-0078](https://docs.openvinotoolkit.org/latest/_models_intel_person_vehicle_bike_detection_crossroad_0078_description_person_vehicle_bike_detection_crossroad_0078.html)
        2. [person-attributes-recognition-crossroad-0230](https://docs.openvinotoolkit.org/latest/_models_intel_person_attributes_recognition_crossroad_0230_description_person_attributes_recognition_crossroad_0230.html)
        3. [person-reidentification-retail-0079](https://docs.openvinotoolkit.org/latest/_models_intel_person_reidentification_retail_0079_description_person_reidentification_retail_0079.html)
        
        To Download these pre-trained models, you can use the scripts in [this repository](https://github.com/henry1758f/SYNNEX_work).
        
          cd ~ && git clone https://github.com/henry1758f/SYNNEX_work.git
          $HOME/SYNNEX_work/Source/model_downloader.sh
          
        You'll see a list like this
             
             1. Download all from DLDT. (about 16.4G Bytes)
             2. Typein specific DLDT model.
             3. Typein an URL of the model.
             4. Convert all public model to IR
             5. EXIT the downloader.
        Choose the option 2 by just input "2" and press Enter. then, copy following string and paste on the terminal to download the models.
            
         person-vehicle-bike-detection-crossroad-0078,person-attributes-recognition-crossroad-0230,person-reidentification-retail-0079
        
    
   * ##### Excuted the demo
          
          $HOME/SYNNEX_SW_Demo/synnex_demo_build/intel64/Release/crossroad_pedestrian_demo \
          -m $HOME/openvino_models/models/SYNNEX_demo/intel/person-vehicle-bike-detection-crossroad-0078/FP32/person-vehicle-bike-detection-crossroad-0078.xml \
          -m_pa $HOME/openvino_models/models/SYNNEX_demo/intel/person-attributes-recognition-crossroad-0230/FP32/person-attributes-recognition-crossroad-0230.xml \
          -m_reid $HOME/openvino_models/models/SYNNEX_demo/intel/person-reidentification-retail-0079/FP32/person-reidentification-retail-0079.xml \
          -i cam \
          -d CPU -d_pa CPU -d_reid CPU

          
   
   ##### If you want to try remote monitoring with Azure IoT Hub, You have to 
   * ##### Install Node.js
    
          curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
          sudo apt-get install -y nodejs
   
   * ##### Install some needed packages
   
          cd $HOME/SYNNEX_SW_Demo/crossroad_pedestrian_demo && npm install
   
   * ##### [Create an IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/quickstart-send-telemetry-node#create-an-iot-hub) 
   * ##### [Associate an Azure Storage account to IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-csharp-file-upload#associate-an-azure-storage-account-to-iot-hub)
   * ##### Register a Edge device on your IoT Hub
   * ##### Create a new file to save your connection string of that Edge Device
      ###### Create a file named "connectString.string" , then put your connection string to this file and saved. (The string file must be saved to where you're going to excute the demo.)
   
  
  
