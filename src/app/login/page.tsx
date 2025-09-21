"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      console.log("Usuario logueado:", user);
      alert(`Bienvenido ${user.name}`);
    } else {
      alert("Credenciales inválidas");
    }
  };
return (
    <div className=" flex  items-center justify-center min-h-screen bg-[url(https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW56YXN8ZW58MHx8MHx8fDA%3D)]  bg-cover bg-center ">
 
      <div className=" w-full max-w-dvh  bg-gray-900 shadow-xl rounded-2xl p-10 ">
       
        <h1 className="text-2xl xl:text-3xl font-extrabold text-center mb-6">Login</h1>


        <form onSubmit={handleSubmit} className=" flex flex-col gap-6  h-80">
          <div >
            <label className="block font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-center border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none p-2"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-center border-b-2 border-gray-300 focus:border-amber-50 focus:outline-none p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition  delay-150 duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  );
}