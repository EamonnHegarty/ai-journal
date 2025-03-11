import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center mt-40">
      <SignIn />
    </div>
  );
};

export default SignInPage;
