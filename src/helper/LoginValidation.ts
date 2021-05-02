import * as Yup from "yup";


export const LoginValidation = Yup.object({
    email: Yup.string().required().email() ,
    password: Yup.string().required(),
})