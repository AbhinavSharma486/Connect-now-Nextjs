'use client';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import React, { useState } from 'react';
import { motion } from "framer-motion";

const AuthButtons = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div

      className='flex gap-3 flex-1 md:flex-row flex-col relative z-50'
    >
      <RegisterLink onClick={() => setIsLoading(true)}>
        <motion.button
          whileHover={{ scale: 1.2 }}
          className='cursor-pointer text-white bg-[#6c63ff] mt-[30px] px-[30px] py-3 rounded-[20px] border-0'
          disabled={isLoading}
        >
          Sign Up
        </motion.button>
      </RegisterLink>

      <LoginLink onClick={() => setIsLoading(true)}>
        <motion.button
          whileHover={{ scale: 1.2 }}
          className='cursor-pointer text-white bg-[#6c63ff] mt-[30px] px-[30px] py-3 rounded-[20px] border-0 hover:bg-[#332da0]'
          disabled={isLoading}
        >
          Log In
        </motion.button>
      </LoginLink >
    </div>
  );
};

export default AuthButtons;