import React, { useState } from "react";
import { db } from "../credenciales"; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from "firebase/firestore";

function AddMatery() {
  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "materias"), {
        name,
        career,
        semester: parseInt(semester),
        description,
      });
      // Clear the form
      setName("");
      setCareer("");
      setSemester("");
      setDescription("");
      setError(null);
      alert("Materia añadida con éxito");
    } catch (error) {
      setError("Error al agregar la materia: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 justify-center">
      <div className="bg-white p-6 m-2 rounded-lg shadow-md w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nombre de la materia:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border p-2 w-full"
              placeholder="Escribe el nombre de la materia..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="career"
              className="block text-gray-700 font-bold mb-2"
            >
              Carrera:
            </label>
            <input
              type="text"
              id="career"
              name="career"
              className="border p-2 w-full"
              placeholder="Escribe la carrera..."
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="semester"
              className="block text-gray-700 font-bold mb-2"
            >
              Semestre:
            </label>
            <input
              type="number"
              id="semester"
              name="semester"
              className="border p-2 w-full"
              placeholder="Escribe el semestre..."
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Descripción:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="border p-2 w-full"
              placeholder="Escribe una descripcion de la materia..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar materia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMatery;
