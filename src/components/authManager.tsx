import { useState } from "react";
import LoginModal from "./loginCard";
import SignUpModal from "./signUpCard";

export default function AuthPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(true); // show login initially
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(creds) => console.log("Login:", creds)}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false); // close login
          setIsSignUpOpen(true); // open signup
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSignUp={(creds) => console.log("SignUp:", creds)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false); // close signup
          setIsLoginOpen(true); // open login
        }}
      />
    </div>
  );
}
