import generateString from "randomstring"


function  GenerateOtp(){

const string = generateString.generate({
    length:6,
    charset:"numeric"
})

return string

}
export default GenerateOtp