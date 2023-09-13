import { Button, PasswordInput, Space, TextInput } from "@mantine/core"
import { useState } from "react"
import { useForm } from "@mantine/form"
import useUser, { Login, Register } from "../states/user.state"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
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
            return 'Le numéro est requis'
          }
          //doit etre digit
          if (isNaN(Number(value))) {
            return 'Le numéro doit être un nombre'
          }

        },

        password: (value) => {
          if (!value) {
            return 'Le mot de passe est requis'
          }
          if (value.length < 6) {
            return 'Le mot de passe doit contenir au moins 6 caractères'
          }

        },

        name: (value) => {
          if (!value) {
            return 'Le nom est requis'
          }
          if (value.length < 3) {
            return 'Le nom doit contenir au moins 3 caractères'
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
        title: 'Succès',
        message: "Vous êtes inscrit avec succès, vous pouvez maintenant vous connecter",
        color: 'green',
        autoClose: 3000,
      })
      setIsSignin(true)
    }).catch((err) => {
      console.log(err)
      notifications.show({
        title: 'Erreur',
        message: "Vérifiez vos informations",
        color: 'red',
        autoClose: 3000,
      })
    }).finally(() => {
      setIsloading(false)
    }
    )
  })}>
    <TextInput label="Nom" withAsterisk  {...form.getInputProps("name")} />
    <TextInput label="Numero tel." withAsterisk  {...form.getInputProps("phoneNumber")} />
    <PasswordInput label="Mot de passe" withAsterisk  {...form.getInputProps("password")} />
    <Space h="md" />
    <Button loading={isloading} fullWidth type="submit" className="bg-primary">
      S'inscrire
    </Button>
    <Space h="xs" />
    <span>
      Vous avez déjà un compte ? <span onClick={() => setIsSignin(true)} className="text-primary cursor-pointer">Se connecter</span>
    </span>
  </form>
}


const SignIn = ({ setIsSignin }: {
  setIsSignin: (value: boolean) => void
}) => {
  const login = useUser().login
  const form = useForm<Login>(
    {
      initialValues: {
        phoneNumber: '',
        password: '',
      },

      validate: {
        password: (value) => {
          if (!value) {
            return 'Le mot de passe est requis'
          }
          if (value.length < 6) {
            return 'Le mot de passe doit contenir au moins 6 caractères'
          }

        },
        phoneNumber: (value) => {
          if (!value) {
            return 'Le numéro est requis'
          }
          //doit etre digit
          if (isNaN(Number(value))) {
            return 'Le numéro doit être un nombre'
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
        title: 'Erreur',
        message: "Vérifiez vos informations",
        color: 'red',
        autoClose: 3000,
      })
    }).finally(() => {
      setIsloading(false)
    }
    )
  })}>
    <TextInput label="Numero tel." withAsterisk  {...form.getInputProps("phoneNumber")} />
    <PasswordInput label="Mot de passe" withAsterisk  {...form.getInputProps("password")} />
    <Space h="md" />
    <Button loading={isloading} fullWidth type="submit" className="bg-primary">
      Se connecter
    </Button>
    <Space h="xs" />
    <span>
      Vous n'avez pas de compte ? <span onClick={() => setIsSignin(false)} className="text-primary cursor-pointer">S'inscrire</span>
    </span>

  </form>
}