import React, { useEffect, useState } from "react";
import { db } from "../credenciales";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Home = () => {
  const [materias, setMaterias] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser; // Obtener el usuario actual

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Consultar los datos del usuario
          const userDocRef = doc(db, "usuarios", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          } else {
            console.error("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchMaterias = async () => {
      if (userInfo) {
        try {
          const materiasCollection = collection(db, "materias");
          // Crear la consulta basada en la carrera y el semestre del usuario
          const materiasQuery = query(
            materiasCollection,
            where("career", "==", userInfo.career),
            where("semester", "==", userInfo.semester)
          );

          const materiaSnapshot = await getDocs(materiasQuery);
          const materiaList = materiaSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMaterias(materiaList);
        } catch (error) {
          console.error("Error fetching materias: ", error);
        }
      }
    };

    fetchMaterias();
  }, [userInfo]);

  return (
    <div className="min-h-screen flex  bg-gray-100 justify-center">
      <div className="p-6 m-2 bg-white rounded-lg shadow-md w-full ">
        HOME
        <h1 className="text-3xl font-semibold mb-4 font-poppins">
          Bienvenido: {user ? user.displayName : "Cargando..."}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materias.map((materia) => (
            <div
              key={materia.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold mb-2">{materia.name}</h2>
              <h3 className="text-lg font-semibold mb-2">{materia.career}</h3>
              <p className="text-gray-700">
                {materia.description || "No description available"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
