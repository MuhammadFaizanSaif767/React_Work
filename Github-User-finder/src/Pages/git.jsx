import { useState, useEffect } from "react";
function GITHUB() {
    const [username, setusername] = useState("");
    const [userdata, setuserdata] = useState(null);
    const [error, seterror] = useState("");
    const [loading,setloading] = useState(false)
    useEffect(() => {
        if (!username) { return }
        setloading(true)
        seterror("")

      
        
            
        
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => {
                if(res.status===404)throw new Error("User not found")
                    if(res.status===403)throw new Error("API call request limit is reached")
                if (!res.ok) throw new Error("User not found")
                return res.json();

            })
            .then((data) => {
                setuserdata(data)
                seterror("")
            })
            .catch((err) => {
                seterror(err.message)
                setuserdata(null)
            })
            .finally(()=>{
                setloading(false)
            })

    }, [username])
    return (

        <div className="maingit">
            <div>
                <h1 >GITHUB USER FINDER</h1>
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) =>{
                        const value = e.target.value;
                         setusername(value)
                        if(value.trim() === ""){
                            setuserdata(null)
                            seterror("Enter Username")

                        }
                    }}
                    
                />

            </div>
            <div className="display">
        
              {loading && <p>Loading...</p>}

                {error && <p>{error}</p>}
                {userdata && (
                    <div>
                        <h3>Name: {userdata.name}</h3>
                        <p className="avatar"> {
                            <img
                                 src={userdata.avatar_url}
                                 alt={userdata.login}
                                 
                                 style={{
                                    width:150, 
                                    borderRadius: "50%" 
                                 }}

                            />}
                        </p>
                        <p> Bio           : {userdata.bio}</p>
                        <p>Followers: {userdata.followers}</p>
                        <p>Following: {userdata.following}</p>
                        <p>Public Repositories: {userdata.public_repos}</p>
                        <p>Profile Link: {" "} 
                            <a href={userdata.html_url} target="_blank" rel="noreferrer">
                            {userdata.html_url}</a>
                            </p>
                       





                    </div>)}
            </div>


        </div>
    )

}
export default GITHUB