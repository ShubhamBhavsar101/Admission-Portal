import { getDatabase, ref, set,update,get,child } from "firebase/database";
export async function receivefromfirebase(uid){
    const dbRef = ref(getDatabase());
    const data  = await get(child(dbRef, `STUDENTS/${uid}`)).then(snapshot => {
        if(snapshot.exists()) {
            return snapshot.val()
        } else {
            console.log("No Data Available")
        }
    }).catch((error) => {
        console.log(error)
    })
    return(data);

}