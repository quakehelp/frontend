/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "../utils/api";
export type User = any

export type Register ={
  name: string
  phoneNumber: string
  password: string
}
export type Login ={
  phoneNumber: string
  password: string
}

type UserState = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register:(register:Register)=>Promise<void>
};

const useUser = create<UserState>()(
  devtools(
    persist(
      (set) => {
        return {
          user: null,
      
          register: (register:Register) => {
            return api.post("/signup",register)
          },
          login: (phoneNumber: string, password: string) => {
             return api.post("/signin", { phoneNumber, password }).then((res) => {
              const data = res.data;
              set({ user: data });
            }
            );
          
          },
        };
      },
      {
        name: "user-storage-v1",
      }
    )
  )
);

export default useUser;
