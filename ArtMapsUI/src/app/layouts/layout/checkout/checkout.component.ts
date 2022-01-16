import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/models/Constants';
import { CybersourceData, SignatureFormDetails } from 'src/app/models/CyberSource';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cyberSourceParams: CybersourceData;
  purchaseFormGroup: FormGroup;
  
  access_key;
  profile_id = '03D318EE-E803-421B-AE03-A8C87E2FE3A5';
  transaction_uuid;
  signed_field_names;
  unsigned_field_names;
  signed_date_time;
  locale;
  transaction_type;
  reference_number;
  amount;
  currency = "USD";
  bill_to_forename;
  bill_to_surname;
  bill_to_address_line1;
  bill_to_address_line2;
  bill_to_address_city;
  bill_to_address_postal_code;
  bill_to_address_state;
  bill_to_address_country;
  bill_to_email;
  signature;
  firstName: string;
  lastName: string;
  csLink: string;
  defaultSubs: string = null;
  hasDefaultsub = false;
  displayQuerterlyOption = true;
  defaultDuration = '12';
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.purchaseFormGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      shipping_address: [null, Validators.required],
      shipping_address2: [null, Validators.required],
      shipping_country: [null, Validators.required],
      shipping_state: [null, Validators.required],
      shipping_zip: [null, Validators.required],
    });
  }
  onPaymentClick(){
    this.cyberSourceParams = {
      access_key: '',
      profile_id: this.profile_id,
      transaction_uuid: '',
      signed_field_names: '',
      unsigned_field_names: '',
      signed_date_time: '',
      reference_number: 'Test',
      transaction_type: Constants.cyberSourceTransactionType,
      amount: '100',
      currency: this.currency,
      locale: Constants.cyberSourceLocale,
      bill_to_forename: this.purchaseFormGroup.value.firstName,
      bill_to_surname: this.purchaseFormGroup.value.lastName,
      bill_to_email: this.purchaseFormGroup.value.email,
      bill_to_address_city: this.purchaseFormGroup.value.shipping_address2,
      bill_to_address_country: this.purchaseFormGroup.value.shipping_country,
      bill_to_address_line1: this.purchaseFormGroup.value.shipping_address,
      bill_to_address_postal_code: this.purchaseFormGroup.value.shipping_zip,
      bill_to_address_state: this.purchaseFormGroup.value.shipping_state
    };
    alert('Your order has been placed successfully');
  }
}
