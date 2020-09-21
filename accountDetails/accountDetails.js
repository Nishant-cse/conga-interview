import { LightningElement, api, wire, track } from 'lwc';
import getRelatedContacts from '@salesforce/apex/AccountDetailsController.getRelatedContacts';
export default class AccountDetails extends LightningElement {
    //Account record Id
    @api recordId;
    error;
    customerSuccessList= [];
    applicationDeveloperList= [];
    //total number of related contacts = customerSuccessList + applicationDeveloperList;
    totalNumContacts= 0;
    //Account fields
    fieldList= ['Name', 'NumberOfEmployees', 'My_Field__c','Phone', 'BillingStreet', 'BillingCity', 'BillingPostalCode'];
    //Contact fields
    columns= [{label:'Last Name',fieldName:'LastName',type:'text'}, {label:'Title',fieldName:'Title',type:'text'}];

    @wire (getRelatedContacts, {parentId : '$recordId'})
    wiredContacts({ error, data }) {
        
        if (data) {
            console.log('data', data);
            for(let key in data){
                if(key == 'customer success'){
                    this.customerSuccessList= data[key];
                }else if(key == 'application developer'){
                    this.applicationDeveloperList= data[key];
                }
            }
            this.totalNumContacts= this.customerSuccessList.length + this.applicationDeveloperList.length;
            this.error = undefined;
             
        } else if (error) {
            this.error = error;
            this.customerSuccessList= undefined;
            this.applicationDeveloperList= undefined;
            console.log(error);
        }
        
    }

    get customerSuccessTitle(){
        return 'Customer Success ('+this.customerSuccessList.length+')';
    }
    get applicationDeveloperTitle(){
        return 'Application Developer ('+this.applicationDeveloperList.length+')';
    }
    get showCustomerSuccess(){
        return this.customerSuccessList.length > 0 ? true : false;
    }
    get showApplicationDeveloper(){
        return this.applicationDeveloperList.length > 0 ? true : false;
    }



}