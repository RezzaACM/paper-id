import * as Yup from "yup";


export const LoginValidation = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
})