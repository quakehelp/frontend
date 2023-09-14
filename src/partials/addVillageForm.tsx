/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { useForm } from "@mantine/form"
import useMapStore, { TLocation,Location } from "../states/map.state"
import { Avatar, Group, NumberInput, Select, Text, TextInput, Textarea, clsx } from "@mantine/core"
import { useState } from "react"
import { colors } from "../utils/theme"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"

type Props = {
    position: {
        lat: number,
        lng: number,
    }
    enteredBy: string,
    phoneNumber: string,
    initialData?: Location
}


const text = {
    green: "Le village a reçu de l'aide mais reste confronté à des pénuries",
    yellow: "Besoins majeurs satisfaits, mais pouvant avoir des besoins sous-jacents ou à plus long terme",
    red: "Village ayant cruellement besoin d’une aide immédiate"
}
const AddVillageForm = ({
    position,
    enteredBy,
    phoneNumber,
    initialData
    
}: Props) => {
    const {addLocation,update} = useMapStore(state => state)
    const form = useForm<TLocation>({
        initialValues: {
            DouarName: initialData?.DouarName || "",
            assoName: initialData?.assoName || "",
            population: initialData?.population || 1,
            needs: initialData?.needs || "",
            pinStatus: initialData?.pinStatus || "green",
            position,
            enteredBy,
            createdAt: new Date(),
            phoneNumber:initialData?.phoneNumber || phoneNumber,
            roadStatus: initialData?.roadStatus || "available",

        },
        validate: {

            DouarName: (value) => {
                if (!value) return 'Ce champ est requis'
            },

            assoName: (value) => {
                if (!value) return 'Ce champ est requis'
            },
            phoneNumber: (value) => {
                if (!value) return 'Ce champ est requis'
            },


            position: (value) => {
                if (!value) return 'Ce champ est requis'
            },
    }

    })
    const [isLoading, setIsLoading] = useState(false)
    return (
        <form onSubmit={form.onSubmit((v) => {
            setIsLoading(true)
            if(initialData){
                update({
                    ...v,
                    _id:initialData._id
                }).then(() => {
                    modals.closeAll()
                }).finally(() => {
                    setIsLoading(false)
                })
            }
            else
            addLocation(v).then(() => {
                modals.closeAll()
            }).finally(() => {
                setIsLoading(false)
            }).catch((e) => {
                console.log('e', e)
                notifications.show({
                    title: 'Erreur',
                    message: 'Une erreur est survenue',
                    color: 'red',
                })
            })
        })} className="space-y-2">
            <TextInput label="Nom"
                placeholder="Nom du village ou de l'endroit"
                {...form.getInputProps('DouarName')} />
            <TextInput label="Association"
                placeholder="Nom de l'association qui a fourni les informations"
                {...form.getInputProps('assoName')} />
            <div className="grid grid-cols-2 gap-4">
                <TextInput label="Téléphone"
                    placeholder="Numéro de téléphone de l'association"
                    {...form.getInputProps('phoneNumber')} />
                <NumberInput label="Nombre de population"
                    min={1} max={1000000} step={1}
                    {...form.getInputProps('population')} />
            </div>
            <Select
                label="Situation actuelle"
                itemComponent={(x) => {
                    const { label, value: s } = x
                    return <div
                        onClick={() => {
                            form.setFieldValue('pinStatus', s)

                        }}
                        ref={s.ref}
                        style={{
                            border: `1px solid ${(colors as any)[s]}`
                        }}
                        className="my-1 px-1 rounded-lg">
                        <Group noWrap className="">
                            <Avatar style={{
                                backgroundColor: (colors as any)[s],


                            }} src={`icons/${s}.svg`} className="p-2" />
                            <div>
                                <Text size="sm">{label}</Text>
                            </div>
                        </Group>
                    </div>
                }}
                className="line-clamp-1"
                data={[
                    {
                        value: 'green',
                        label: text.green
                    },
                    {
                        value: 'yellow',
                        label: text.yellow
                    },
                    {
                        value: 'red',
                        label: text.red
                    }
                ]}
                {...form.getInputProps('pinStatus')}


            />
            <Textarea minRows={3} label="Besoins"
                placeholder="Nourriture, vêtements, médicaments, etc."
                {...form.getInputProps('needs')} />

            <Select
                label="Situation routière"

                className="line-clamp-1"
                data={[
                    {
                        value: 'available',
                        label: "Route praticable"
                    },
                    {
                        value: 'unavailable',
                        label: "Route impraticable"
                    },
                    {
                        value: 'dangerous',
                        label: "Route dangereuse"
                    }
                ]}
                {...form.getInputProps('roadStatus')}

            />
            <div className="mt-4 flex flex-row gap-3 justify-end">
                <button onClick={() => {
                    modals.closeAll()
                }} className="btn btn-sm btn-ghost">
                    Annuler
                </button>
                <button type="submit" className={clsx("btn btn-sm btn-primary text-white", {
                    "loading": isLoading,
                })}>
                    Ajouter
                </button>
            </div>
        </form>
    )
}

export default AddVillageForm

