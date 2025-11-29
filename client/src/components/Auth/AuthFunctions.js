export const isTokenExpired=(token)=>{
  const [user,datePart,timePart] = token.split("/");
  const [d, m, y] = datePart.split("-");
  const [h = 0, min = 0] = timePart?.split(":") || [];
  const given = new Date(y, m - 1, d, h, min);
  const now = new Date();
  return now > given;
}

export const generateToken = (user) => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 10);
  const d = expiry.getDate();          
  const m = expiry.getMonth() + 1;     
  const y = expiry.getFullYear();
  const h = expiry.getHours();         
  const min = expiry.getMinutes();     
  return `${user}/${d}-${m}-${y}/${h}:${min}`;
};

export const deleteToken=()=>{
    window.localStorage.removeItem("token")
}

export const getToken=()=>{
    return window.localStorage.getItem("token")
}