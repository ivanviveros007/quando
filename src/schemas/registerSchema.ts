import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es requerido"),
  areaCode: Yup.string()
    .oneOf(["+54", "+34"], "Selecciona un código de área válido")
    .required("El código de área es requerido"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Solo números")
    .min(10, "El número de teléfono debe tener al menos 10 dígitos")
    .required("El teléfono es requerido"),
});
