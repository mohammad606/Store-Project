'use client'
import {StoreService} from "@/services/seviceDirect/StoreService";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createClient} from '@supabase/supabase-js'
import {supabase} from "@/services/subabase/SupabaseServise";
import {InputService} from "@/services/seviceDirect/InputService";
import {Store} from "@/services/module/Store";


const Home = () => {

    const cleanedData= (data:Store[]|undefined)=>{
       return  data?.filter(item => item !== null) as Exclude<Store, null>[]
    };

    const Strore = {

            id: 5,
            qtn: 55,
            name: "gggggggggg"

    }

    const {data, error} = useQuery({
        queryKey: ['newData'],
        queryFn: async () => {
            return await StoreService.make<StoreService>().ReadDataBase()
        }

    })



        console.log(data)

    return (
        <></>
    )
}

export default Home