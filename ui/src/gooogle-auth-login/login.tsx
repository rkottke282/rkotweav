import { useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

declare type LoginProps = {
    setUser: Function,
    setProfile: Function,
    user: any,
    profile: any
}

const Login = (props: LoginProps) => {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            props.setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (props.user) {
                const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${props.user.access_token}`;
                fetch(url,
                    {
                        headers: {
                            Authorization: `Bearer ${props.user.access_token}`,
                            Accept: 'application/json'
                        }
                    }
                ).then((res: any) => {
                    return res.text();
                }).then((body: any) => {
                    props.setProfile(JSON.parse(body));
                })
                .catch((err) => console.log(err));
            }
        },
        [ props.user ]
    );

    const logOut = () => {
        googleLogout();
        props.setProfile(undefined);
    };

    return (
        <div className="flex justify-center text-center">
            {props.profile ? (
                <div className="text-sm text-slate-300">
                    <div>
                        Logged in as: {props.profile.name} ({props.profile.email})
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
export type {LoginProps};