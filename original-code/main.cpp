
// SMART FACTORY HEALTH MONITOR

#include<iostream>
#include<string>
using namespace std;

int main(){

    int machine_id;
    string machine_name;
    int total_operating_hours;

    // WELCOME HEADING

    cout<<"===================================="<<endl;
    cout<<"     SMART FACTORY HEALTH MONITOR"<<endl;
    cout<<"===================================="<<endl;

    // MACHINE REGISTRATION

    cout<<"Enter Machine ID: ";
    cin>>machine_id;

    cin.ignore();

    cout<<"Enter Machine Name: ";
    getline(cin,machine_name);

    cout<<"Enter Total Operating Hours: ";
    cin>>total_operating_hours;

    // DISPLAY MACHINE DETAILS

    cout<<endl;
    cout<<"------ MACHINE REGISTRATION ------"<<endl;

    cout<<"Machine ID: "<<machine_id<<endl;
    cout<<"Machine Name: "<<machine_name<<endl;
    cout<<"Operating Hours: "<<total_operating_hours<<endl;

    cout<<"----------------------------------"<<endl;
    cout<<"Registration Successful!"<<endl;
    

    // PART 2 - SENSOR DATA COLLECTION

    float temperature,vibration,pressure;

    cout<<"ENTER TEMPRATURE ";
    cin>>temperature;

    cout<<"ENTER VIBRATION ";
    cin>>vibration;

    cout<<"ENTER PRESSURE ";
    cin>>pressure;


       // DISPLAY SENSOR DATA

    cout<<endl;
    cout<<"-------- SENSOR DATA REPORT --------"<<endl;

    cout<<"Temperature: "<<temperature<<" C"<<endl;
    cout<<"Vibration: "<<vibration<<" mm/s"<<endl;
    cout<<"Pressure: "<<pressure<<" bar"<<endl;

    cout<<"------------------------------------"<<endl;
    cout<<"Sensor Data Collection Complete!"<<endl;


    // PART 3 SENSOR HEALTH ANALYSIS

   
    // PART 3 - SENSOR HEALTH ANALYSIS

    cout<<endl;
    cout<<"===================================="<<endl;
    cout<<"       SENSOR HEALTH ANALYSIS"<<endl;
    cout<<"===================================="<<endl;

    // TEMPERATURE ANALYSIS

    if(temperature>=20 && temperature<=60){
        cout<<"TEMPERATURE STATUS: NORMAL"<<endl;
    }
    else{
        cout<<"TEMPERATURE STATUS: ABNORMAL"<<endl;
    }

    // VIBRATION ANALYSIS

    if(vibration>=0 && vibration<=5){
        cout<<"VIBRATION STATUS: NORMAL"<<endl;
    }
    else{
        cout<<"VIBRATION STATUS: ABNORMAL"<<endl;
    }

    // PRESSURE ANALYSIS

    if(pressure>=2 && pressure<=8){
        cout<<"PRESSURE STATUS: NORMAL"<<endl;
    }
    else{
        cout<<"PRESSURE STATUS: ABNORMAL"<<endl;
    }

    cout<<"===================================="<<endl;
    
   // PART 4 - AUTOMATIC ABNORMAL SENSOR COUNTER

int abnormal_count = 0;
int normal_count = 0;

// TEMPERATURE CHECK

if(temperature >= 20 && temperature <= 60){
    normal_count++;
}
else{
    abnormal_count++;

}

// VIBRATION CHECK

if(vibration >= 0 && vibration <= 5){
    normal_count++;


}
else{
    abnormal_count++;
}

// PRESSURE CHECK

if(pressure >= 2   && pressure <= 8){
    normal_count++;
}
else{

    abnormal_count++;

}



// MACHINE HEALTH SUMMARY

cout << endl;
cout << "====================================" << endl;
cout << "       MACHINE HEALTH SUMMARY" << endl;
cout << "====================================" << endl;

cout << "Total Sensors: 3" << endl;
cout << "Normal Sensors: " << normal_count << endl;
cout << "Abnormal Sensors: " << abnormal_count << endl;

cout << "====================================" << endl;

// PART 5 - OVERALL MACHINE STATUS

cout << endl;
cout << "======= OVERALL MACHINE STATUS =======" << endl;



if(abnormal_count==0){
    cout<<"MACHINE STATUS: HEALTHY"<<endl;
}
else if(abnormal_count==1){
    cout<<"MACHINE STATUS: WARNING"<<endl;
}

else if(abnormal_count>=2){
    cout<<"MACHINE STATUS: CRITICAL"<<endl;
}

if(abnormal_count>=2){
    cout<<"IMMEDIATE INSPECTION REQUIRED"<<endl;
}

// PART 6 - MAINTENANCE ALERT SYSTEM

if(total_operating_hours<500){
    cout<<"DISPLAY MAINTENANCE NOT REQUIRED"<<endl;
}

else if (total_operating_hours>=500 &&  total_operating_hours<=999){
    cout<<"SCHEDULE ROUTINE MAINTENANCE"<<endl;
}

else{
    cout<<"URGENT MAINTENANCE REQUIRED"<<endl;
}

// PART 7 - MACHINE PERFORMANCE SCORE

float health_score;

health_score=(normal_count/3.0)*100;

if(health_score==100){
    cout<<"MACHINE PERFORMANCE:EXCELLENT"<<endl;
}

else if(health_score>=66.67){
    cout<<"MACHINE PERFORMANCE:GOOD"<<endl;
}
else if(health_score>=33.33){
    cout<<"MACHINE PERFORMAMCE:POOR"<<endl;
}

else{
    cout<<"MACHINE PERFORMANCE:VERY POOR"<<endl;
}

cout<<"Health Score: "<<health_score<<"%"<<endl;

cout<<"-------AUTOMATIC MAINTENANCE RECOMMENDATION-------- ";

if(abnormal_count>=2){
    cout<<"STOP MACHINE "<<endl;
    cout<<"CALL MAINTENANCE TEAM"<<endl;
    cout<<"DANGER: MACHINE FAILURE RISK"<<endl;
}

else if(abnormal_count==1){
    cout<<"INSPECT AFFECTED SENSOR"<<endl;
}
else{
    cout<<"MACHINE OPERATION CAN CONTINUE"<<endl;
}

if(total_operating_hours>=1000){
    cout<<"COMPLETE SERVICING REQUIRED"<<endl;
}
else{
    cout<<"NO COMPLETE SERVICING REQUIRED"<<endl;
}

cout<<"-------- MACHINE RISK CLASSIFICATION -----------";

if(health_score==100){
    cout<<"VERY LOW RISK"<<endl;
}
else if(health_score>=66.67){
    cout<<"LOW RISK"<<endl;
}
else if(health_score>=33.33){
    cout<<"MEDIUM RISK"<<endl;
}
else{
    cout<<"HIGH RISK"<<endl;
}

cout<<"------- MACHINE EFFICIENCY CLASSIFICATION ---------- ";

if(total_operating_hours<500){
    cout<<"LOW MACHINE UTILIZATION :"<<endl;
}
else if(total_operating_hours>=500 && total_operating_hours<1000){
    cout<<"MODERATE MACHINE UTILIZATION"<<endl;
}
else{
    cout<<"HIGH MACHINE UTILIZATION"<<endl;
}

if(health_score>=66.67){
    cout<<"EFFICIENCY CONDITION: GOOD"<<endl;
}
else{
    cout<<"EFFICIENCY CONDITION: NEEDS IMPROVEMENT"<<endl;
}


return 0;

}
