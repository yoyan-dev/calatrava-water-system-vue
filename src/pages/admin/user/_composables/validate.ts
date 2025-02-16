export function validateForm(resident: any) {

    const requiredFields = ['fullname', 'accountNumber', 'address'];
    
    if(resident.accountNumber){
        if (resident.accountNumber.toString().length < 11 || resident.accountNumber.toString().length > 11) {
            return { error: true, errorAccountNumberMessage: "Account number must be 11 digits"}
        }
    }
    
    for (const field of requiredFields) {
        if (!resident[field]) {
            return { error: true, errorAccountNumberMessage: ''}
        }
    }

    return { error: false, errorAccountNumberMessage: ''}
}