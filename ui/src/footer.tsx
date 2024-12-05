import Login, { LoginProps } from "./gooogle-auth-login/login";

export default function Footer(props: LoginProps) {
    return (
        <div className="container fixed bottom-0">
            <Login 
                user={props.user}
                setUser={props.setUser}
                profile={props.profile}
                setProfile={props.setProfile} />
        </div>
    )
}