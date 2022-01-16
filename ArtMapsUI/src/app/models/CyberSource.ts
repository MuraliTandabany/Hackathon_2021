export interface CybersourceData {
    access_key: string;
    profile_id: string;
    transaction_uuid: string;
    signed_field_names: string;
    unsigned_field_names: string;
    signed_date_time: string;
    locale: string;
    transaction_type: string;
    reference_number: string;
    amount: string;
    currency: string;
    bill_to_forename: string;
    bill_to_surname: string;
    bill_to_address_line1: string;
    bill_to_address_city: string;
    bill_to_address_postal_code: string;
    bill_to_address_state: string;
    bill_to_address_country: string;
    bill_to_email: string;
}


export interface SignatureFormDetails {
    transaction_uuid: string;
    reference_number: string;
    signed_date_time: string;
    signature: string;
}
