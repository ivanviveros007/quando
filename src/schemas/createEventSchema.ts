import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  planType: Yup.string().required("El tipo de plan es obligatorio"),
  title: Yup.string().required("El título es obligatorio"),
  date: Yup.date().required("La fecha es obligatoria"),
  time: Yup.string().required("La hora es obligatoria"),
  location: Yup.string().required("La ubicación es obligatoria"),
  description: Yup.string(),
});
