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
import { useTranslation } from "react-i18next"

type Props = {
    position: {
        lat: number,
        lng: number,
    }
    enteredBy: string,
    phoneNumber: string,
    initialData?: Location
}



const AddVillageForm = ({
    position,
    enteredBy,
    phoneNumber,
    initialData
    
}: Props) => {
    const {t}=useTranslation();

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
                if (!value) return t("AddVillage.requis")
            },



            position:{
                lat:(value)=>{
                    if(!value) return t("AddVillage.requis")
                    if(value>100 || value<-100) return true
                },
                lng:(value)=>{
                    if(!value) return t("AddVillage.requis")
                    if(value>100 || value<-100) return true
                }
            
            }
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
                    title: t("AddVillage.Err"),
                    message: t("AddVillage.messageErr"),
                    color: 'red',
                })
            })
        })} className="space-y-1">
            <TextInput label={t("AddVillage.Nom")}
                placeholder={t("AddVillage.NomPlaceholder")}
                {...form.getInputProps('DouarName')} />
            <TextInput label={t("AddVillage.Association")}
                placeholder={t("AddVillage.AssociationPlaceholder")}
                {...form.getInputProps('assoName')} />
            <div className="grid grid-cols-2 gap-4">
                <TextInput label={t("AddVillage.Téléphone")}
                    placeholder={t("AddVillage.tel placeholder")}
                    {...form.getInputProps('phoneNumber')} />
                <NumberInput label={t("AddVillage.Population")}
                    min={1} max={1000000} step={1}
                    {...form.getInputProps('population')} />
            </div>
            <Select
                label={t("AddVillage.Situation actuelle")}
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
                        label: t("card.colorStatus.green")
                    },
                    {
                        value: 'yellow',
                        label:t("card.colorStatus.yellow")
                    },
                    {
                        value: 'red',
                        label: t("card.colorStatus.red")
                    }
                ]}
                {...form.getInputProps('pinStatus')}


            />
            <Textarea minRows={3} label={t("AddVillage.Besoins")}
                placeholder={t("AddVillage.BesoinsPlaceholder")}
                {...form.getInputProps('needs')} />

            <Select
                label= {t("AddVillage.Situation routière")}

                className="line-clamp-1"
                data={[
                    {
                        value: 'available',
                        label: t("AddVillage.Route.Route praticable")
                    },
                    {
                        value: 'unavailable',
                        label: t("AddVillage.Route.Route impraticable")
                    },
                    {
                        value: 'dangerous',
                        label: t("AddVillage.Route.Route dangereuse")
                    }
                ]}
                {...form.getInputProps('roadStatus')}

            />
            <div dir={'ltr'} className="grid grid-cols-1 gap-1">
        <TextInput  label={t("AddVillage.lat")}
                   
                    
               
                    type="number"
                    {...form.getInputProps('position.lat')} />
                            <TextInput label={t("AddVillage.lng")}
               
                    type="number"
                    {...form.getInputProps('position.lng')} />
            </div>
            <div className="mt-4 flex flex-row gap-3 justify-end">
                <button onClick={() => {
                    modals.closeAll()
                }} className="btn btn-sm btn-ghost">
                     {t("common.button.cancel")}
                </button>
                <button type="submit" className={clsx("btn btn-sm btn-primary text-white", {
                    "loading": isLoading,
                })}>
                    {t("common.button.ajouter")}
                </button>
            </div>
        </form>
    )
}

export default AddVillageForm

