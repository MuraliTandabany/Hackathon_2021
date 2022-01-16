export class Constants {
    public static get cyberSourceSignedFieldNames(): string {return 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,tax_amount,currency,bill_to_forename,bill_to_surname,bill_to_address_line1,bill_to_address_city,bill_to_address_postal_code,bill_to_address_state,bill_to_address_country,bill_to_email,line_item_count,item_0_unit_price,item_0_name,item_0_sku,item_0_quantity,item_0_tax_amount'};
    public static get cyberSourceUnSignedFieldNames(): string {return 'line_item_count,item_0_unit_price,item_0_name,item_0_sku,item_0_quantity,item_0_tax_amount'};
    public static get cyberSourceLocale(): string {return 'en'}
    public static get cyberSourceTransactionType(): string {return 'sale'}
}