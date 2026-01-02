import { useState } from "react";
import { createPlace } from "../services/placesService";

export default function PlaceForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createPlace(form);
      setForm({ name: "", location: "", note: "" });
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Nama tempat"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Lokasi"
        value={form.location}
        onChange={handleChange}
      />

      <input
        name="note"
        placeholder="Catatan singkat"
        value={form.note}
        onChange={handleChange}
      />

      <button disabled={loading}>{loading ? "Menyimpan..." : "Tambah"}</button>
    </form>
  );
}
