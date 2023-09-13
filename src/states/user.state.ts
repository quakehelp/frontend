import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
class User {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

type UserState = {
  user: User | null;
  error: string | null;
  loading: boolean;
  login: (username: string, password: string) => void;
};

const useUser = create<UserState>()(
  devtools(
    persist(
      (set) => {
        return {
          user:{
            username: "admin",
            password: "admin",
          },
          error: null,
          loading: false,
          login: (username: string, password: string) => {
            set({ loading: true });
            setTimeout(() => {
              if (username === "admin" && password === "admin") {
                set({
                  user: new User(username, password),
                  error: null,
                  loading: false,
                });
              } else {
                set({
                  error: "Username or password is incorrect",
                  loading: false,
                });
              }
            }, 1000);
          },
        };
      },
      {
        name: "user-storage",
      }
    )
  )
);

export default useUser;
