import React, { useState, useContext } from "react";
import { Sparkles, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      if (data.success) {

        toast.success("Registration Successful");

        navigate("/login");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message || error.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 px-6">

      <div
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 flex items-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-7 h-7 text-indigo-600" />
        <span className="font-bold text-lg">MyApp</span>
      </div>

      <div className="bg-slate-900 p-10 rounded-xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl text-white font-bold text-center mb-2">
          Register
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Create your account
        </p>

        <form onSubmit={onSubmitHandler}>

          <div className="mb-4 flex items-center gap-3 bg-[#333A5C] px-5 py-3 rounded-full">
            <User className="text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <div className="mb-4 flex items-center gap-3 bg-[#333A5C] px-5 py-3 rounded-full">
            <Mail className="text-gray-400 w-5 h-5" />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <div className="mb-5 flex items-center gap-3 bg-[#333A5C] px-5 py-3 rounded-full">
            <Lock className="text-gray-400 w-5 h-5" />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white"
          >
            {loading ? "Please wait..." : "Register"}
          </button>

        </form>

        <p className="text-gray-400 text-center text-sm mt-5">
          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer underline"
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );

};

export default Register;