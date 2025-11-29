export const generateResponse=(success=null,code=null,message=null,data=null)=>{
    return {
        status:{
            success,
            code
        },
        message,
        data
    }
}