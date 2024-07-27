import React from "react";

const AboutMe = ({ user }) => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="p-6 m-2 bg-white rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-4">Sobre Mi</h1>
        <h2>Nombre: {user.displayName}</h2>
        <h2>Email: {user.email}</h2>
        <div className="items-center justify-center">
          <img className="" src={user.photoURL} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
