// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaTimes } from 'react-icons/fa';

// function SignIn({ onSignIn }) {
//     const [isSignUp, setIsSignUp] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         setError('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             if (isSignUp) {
//                 if (!formData.name || !formData.email || !formData.password) {
//                     setError('All fields are required');
//                     return;
//                 }
//                 if (formData.password !== formData.confirmPassword) {
//                     setError('Passwords do not match');
//                     return;
//                 }
//                 const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
//                 if (existingUsers.some(user => user.email === formData.email)) {
//                     setError('Email already registered');
//                     return;
//                 }

//                 const newUser = {
//                     id: Date.now(),
//                     name: formData.name,
//                     email: formData.email,
//                     password: formData.password,
//                     image: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=0e0e0e&color=90EE90`,
//                     headline: 'Member at CivicSense',
//                     connections: [],
//                     posts: [],
//                     joinedDate: new Date().toISOString()
//                 };

//                 localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

//                 onSignIn({
//                     id: newUser.id,
//                     name: newUser.name,
//                     email: newUser.email,
//                     image: newUser.image,
//                     headline: newUser.headline,
//                     connections: newUser.connections,
//                     posts: newUser.posts,
//                     joinedDate: newUser.joinedDate
//                 });
//             } else {
//                 if (!formData.email || !formData.password) {
//                     setError('Email and password are required');
//                     return;
//                 }

//                 const users = JSON.parse(localStorage.getItem('users') || '[]');
//                 const user = users.find(u => u.email === formData.email && u.password === formData.password);

//                 if (!user) {
//                     setError('Invalid email or password');
//                     return;
//                 }

//                 onSignIn({
//                     id: user.id,
//                     name: user.name,
//                     email: user.email,
//                     image: user.image,
//                     headline: user.headline,
//                     connections: user.connections,
//                     posts: user.posts,
//                     joinedDate: user.joinedDate
//                 });
//             }
//         } catch (err) {
//             setError('An error occurred. Please try again.');
//             console.error('Auth error:', err);
//         }
//     };

//     return (
//         <section className="min-h-screen py-20 bg-[#0e0e0e] text-[#90EE90] relative overflow-hidden">
//             <div className="absolute inset-0 overflow-hidden">
//                 <motion.div
//                     className="absolute inset-0 bg-gradient-to-br from-[#90ee901a] via-transparent to-[#90ee9022]"
//                     animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
//                     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//                 />
//             </div>

//             <div className="container mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center">
//                 <img src="/logo.png" alt="CivicSense Logo" className="w-36 sm:w-48 mb-10 drop-shadow-[0_0_30px_rgba(144,238,144,0.25)]" />

//                 <div className="w-full max-w-md">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="bg-[#1a1a1a] rounded-2xl shadow-lg p-8 border border-[#3b3b3b]"
//                     >
//                         <div className="text-center mb-8">
//                             <h2 className="text-3xl font-bold mb-2">
//                                 {isSignUp ? 'Create Account' : 'Welcome Back'}
//                             </h2>
//                             <p className="text-[#90EE90]/70">
//                                 {isSignUp ? 'Join CivicSense Community' : 'Sign in to continue'}
//                             </p>
//                         </div>

//                         {error && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: -10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 flex items-center justify-between"
//                             >
//                                 <span>{error}</span>
//                                 <button onClick={() => setError('')}>
//                                     <FaTimes />
//                                 </button>
//                             </motion.div>
//                         )}

//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {isSignUp && (
//                                 <div className="relative">
//                                     <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         placeholder="Full Name"
//                                         className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
//                                         required
//                                     />
//                                 </div>
//                             )}

//                             <div className="relative">
//                                 <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     placeholder="Email Address"
//                                     className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
//                                     required
//                                 />
//                             </div>

//                             <div className="relative">
//                                 <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     placeholder="Password"
//                                     className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
//                                     required
//                                 />
//                             </div>

//                             {isSignUp && (
//                                 <div className="relative">
//                                     <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
//                                     <input
//                                         type="password"
//                                         name="confirmPassword"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         placeholder="Confirm Password"
//                                         className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
//                                         required
//                                     />
//                                 </div>
//                             )}

//                             <motion.button
//                                 whileHover={{ scale: 1.03 }}
//                                 whileTap={{ scale: 0.97 }}
//                                 type="submit"
//                                 className="w-full bg-[#90EE90] text-black py-3 rounded-xl font-medium hover:bg-[#77cc77] transition duration-300 flex items-center justify-center gap-2 shadow-md"
//                             >
//                                 <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
//                                 <FaArrowRight />
//                             </motion.button>
//                         </form>

//                         <div className="mt-6 text-center">
//                             <button
//                                 onClick={() => {
//                                     setIsSignUp(!isSignUp);
//                                     setError('');
//                                     setFormData({
//                                         name: '',
//                                         email: '',
//                                         password: '',
//                                         confirmPassword: ''
//                                     });
//                                 }}
//                                 className="text-[#90EE90]/70 hover:text-[#90EE90] transition duration-300"
//                             >
//                                 {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
//                             </button>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default SignIn;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaTimes } from 'react-icons/fa';
import api from '../api'; // ✅ Use shared axios instance

function SignIn({ onSignIn }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        if (!formData.name || !formData.email || !formData.password) {
          setError('All fields are required');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // ✅ Register API call
        await api.post('/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        // ✅ Auto login after registration
        const loginRes = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });

        const { token } = loginRes.data;
        localStorage.setItem('token', token);

        const userInfo = JSON.parse(atob(token.split('.')[1]));
        const user = {
          id: userInfo.id,
          name: formData.name,
          email: formData.email
        };

        onSignIn(user);
      } else {
        if (!formData.email || !formData.password) {
          setError('Email and password are required');
          return;
        }

        // ✅ Login API call
        const res = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });

        const { token } = res.data;
        localStorage.setItem('token', token);

        const userInfo = JSON.parse(atob(token.split('.')[1]));
        const user = {
          id: userInfo.id,
          name: userInfo.name || "User",
          email: formData.email
        };

        onSignIn(user);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <section className="min-h-screen py-20 bg-[#0e0e0e] text-[#90EE90] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#90ee901a] via-transparent to-[#90ee9022]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center">
        <img src="/logo.png" alt="CivicSense Logo" className="w-36 sm:w-48 mb-10 drop-shadow-[0_0_30px_rgba(144,238,144,0.25)]" />

        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#1a1a1a] rounded-2xl shadow-lg p-8 border border-[#3b3b3b]"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-[#90EE90]/70">
                {isSignUp ? 'Join CivicSense Community' : 'Sign in to continue'}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 flex items-center justify-between"
              >
                <span>{error}</span>
                <button onClick={() => setError('')}>
                  <FaTimes />
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
                  required
                />
              </div>

              {isSignUp && (
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#90EE90]/40" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full pl-12 pr-4 py-3 bg-black border border-[#90EE90]/20 rounded-xl text-[#90EE90] placeholder-[#90EE90]/40 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/30"
                    required
                  />
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#90EE90] text-black py-3 rounded-xl font-medium hover:bg-[#77cc77] transition duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <FaArrowRight />
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="text-[#90EE90]/70 hover:text-[#90EE90] transition duration-300"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
