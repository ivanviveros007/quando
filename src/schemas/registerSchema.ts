import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es requerido"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Solo números")
    .required("El número de teléfono es requerido"),
});
