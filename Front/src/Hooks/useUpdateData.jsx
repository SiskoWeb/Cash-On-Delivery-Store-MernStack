import baseUrl from "../Api/baseURL";


const useUpdateDataWithImage = async (url, body) => {


    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }


    const res = await baseUrl.put(url, body, config)

    return res
}




const useUpdateData = async (url, body) => {
    const config = {
        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }

    const res = await baseUrl.put(url, body, config)
    return res
}

export { useUpdateData, useUpdateDataWithImage }