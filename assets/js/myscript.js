function validatePhoneNumber() {
  var phoneNumber = document.getElementById('phoneNumber').value
  var pattern = /^[6-9]\d{9}$/

  if (!pattern.test(phoneNumber)) {
    document.getElementById('phoneNumberHelp').innerHTML =
      'Invalid phone number'
    document.getElementById('phoneNumberHelp').classList.add('error')
    return false
  } else {
    document.getElementById('phoneNumberHelp').innerHTML =
      "We'll never share your phone number with anyone else."
    document.getElementById('phoneNumberHelp').classList.remove('error')
    return true
  }
}
