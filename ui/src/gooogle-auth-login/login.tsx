import { useContext, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { ProfileContext } from './profile-context';
import { UserContext } from './user-context';


const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const { profile, setProfile } = useContext(ProfileContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('Login Succeeded')
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`;
                fetch(url,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    }
                ).then((res: any) => {
                    return res.text();
                }).then((body: any) => {
                    setProfile(JSON.parse(body));
                })
                .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setUser(null);
    };

    return (
        <div className="flex justify-center text-center">
            {profile ? (
                <div className="text-sm text-slate-300">
                    <div>
                        Logged in as: {profile.name} ({profile.email})
                    </div>
                    <div onClick={logOut} style={{cursor: 'pointer'}}>
                        Log out 
                    </div>
                </div> 
            ) : (
                <button onClick={() => login()}>Sign In</button>
            )}
        </div>
    )
}
export default Login;