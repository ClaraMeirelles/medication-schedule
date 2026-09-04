import { useState } from "react";

export function useForm(initialState) {
  const [form, setForm] = useState(initialState);

  const onChangeForm = (event) => {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setForm(initialState);
  };

  return [form, onChangeForm, resetForm];
}
