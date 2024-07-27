import React from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db } from "../credenciales";
import { doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const Login = () => {
  const funcAutenticacion = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Verificar si el usuario ya existe en Firestore
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Si el usuario no existe, crear el documento con el rol y otra información
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          userType: "Student",
          career: "Sistemas Computacionales",
          semester: 1,
        });

        console.log("Nuevo usuario creado y guardado en Firestore: ", user);
      } else {
        console.log("Usuario ya existe en Firestore: ", user);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verificar si el usuario ya existe en Firestore
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Si el usuario no existe, crear el documento con el rol y otra información
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          userType: "Student",
          career: "Sistemas Computacionales",
          semester: 1,
        });

        console.log("Nuevo usuario creado y guardado en Firestore: ", user);
      } else {
        console.log("Usuario ya existe en Firestore: ", user);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={funcAutenticacion}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <div className="mt-6">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="bg-blue-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar Sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
