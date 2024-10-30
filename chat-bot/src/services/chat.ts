
export const getAllMesage = async () =>{
    try {
        
        const res = await fetch('')
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}