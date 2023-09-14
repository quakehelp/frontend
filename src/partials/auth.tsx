import { Button, PasswordInput, Space, TextInput } from "@mantine/core"
import { useState } from "react"
import { useForm } from "@mantine/form"
import useUser, { Login, Register } from "../states/user.state"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { useTranslation } from "react-i18next"
const Auth = () => {


  const [isSignin, setIsSignin] = useState(false)
  return (
    <div>
      {isSignin ? <SignIn setIsSignin={setIsSignin} /> : <SignUp setIsSignin={setIsSignin} />}
    </div>
  )
}
export default Auth
const SignUp = ({ setIsSignin }: {
  setIsSignin: (value: boolean) => void
}) => {
  const {t}=useTranslation();
  const form = useForm<Register>(
    {
      initialValues: {
        name: '',
        password: '',
        phoneNumber: '',
      },

      validate: {
        phoneNumber: (value) => {
          if (!value) {
           return  t("Se connecter.validation.NumRequis")

          }
          //doit etre digit
          if (isNaN(Number(value))) {
            return  t("Se connecter.validation.NumValue")
          }

        },

        password: (value) => {
          if (!value) {
            return  t("Se connecter.validation.PassRequis")
          }
          if (value.length < 6) {
            return  t("Se connecter.validation.PassValue")
          }

        },

        name: (value) => {
          if (!value) {
            return  t("Se connecter.validation.NomRequis")
          }
          if (value.length < 3) {
            return  t("Se connecter.validation.NomValue")
          }
        }
      }
    }
  )
  const register = useUser().register
  const [isloading, setIsloading] = useState(false)
  return <form onSubmit={form.onSubmit((v) => {
    setIsloading(true)
    console.log('v', v)
    register(v).then(() => {
      notifications.show({
        title:  t("Se connecter.validation.titleSuccConnect"),
        message:t("Se connecter.validation.msgConnect"),
        color: 'green',
        autoClose: 3000,
      })
      setIsSignin(true)
    }).catch((err) => {
      console.log(err)
      notifications.show({
        title:  t("Se connecter.validation.titleErrConnect"),
        message: t("Se connecter.validation.errConnect"),
        color: 'red',
        autoClose: 3000,
      })
    }).finally(() => {
      setIsloading(false)
    }
    )
  })}>
    <TextInput label={t("user.name")} withAsterisk  {...form.getInputProps("name")} />
    <TextInput label={t("user.phoneNumber")} withAsterisk  {...form.getInputProps("phoneNumber")} />
    <PasswordInput label={t("user.password")} withAsterisk  {...form.getInputProps("password")} />
    <Space h="md" />
    <Button loading={isloading} fullWidth type="submit" className="bg-primary">
    {t("Se connecter.signup")}
    </Button>
    <Space h="xs" />
    <span>
    {t("Se connecter.loginconfirm")} <span onClick={() => setIsSignin(true)} className="text-primary cursor-pointer"> {t("Se connecter.connect")} </span>
    </span>
  </form>
}


const SignIn = ({ setIsSignin }: {
  setIsSignin: (value: boolean) => void
}) => {
  const login = useUser().login
  const {t}=useTranslation();

  const form = useForm<Login>(
    {
      initialValues: {
        phoneNumber: '',
        password: '',
      },

      validate: {
        password: (value) => {
          if (!value) {
            return t("Se connecter.validation.PassRequis")
          }
          if (value.length < 6) {
            return  t("Se connecter.validation.PassValue")
          }

        },
        phoneNumber: (value) => {
          if (!value) {
            return t("Se connecter.validation.NumRequis")
          }
          //doit etre digit
          if (isNaN(Number(value))) {
            return  t("Se connecter.validation.NumValue")
          }

        },
      }
    }
  )
  const [isloading, setIsloading] = useState(false)
  return <form onSubmit={form.onSubmit((v) => {
    console.log('v', v)
    setIsloading(true)
    login(v.phoneNumber, v.password).then(() => {
      modals.closeAll()
    }).catch((err) => {
      console.log(err)
      notifications.show({
        title:  t("Se connecter.validation.titleErrConnect"),
        message: t("Se connecter.validation.errConnect"),
        color: 'red',
        autoClose: 3000,
      })
    }).finally(() => {
      setIsloading(false)
    }
    )
  })}>
    <TextInput label={t("user.phoneNumber")} withAsterisk  {...form.getInputProps("phoneNumber")} />
    <PasswordInput label={t("user.password")} withAsterisk  {...form.getInputProps("password")} />
    <Space h="md" />
    <Button loading={isloading} fullWidth type="submit" className="bg-primary">
    {t("Se connecter.connect")} 
    </Button>
    <Space h="xs" />
    <span>
    {t("Se connecter.signupconfirm")} <span onClick={() => setIsSignin(false)} className="text-primary cursor-pointer">{t("Se connecter.signup")}</span>
    </span>

  </form>
}