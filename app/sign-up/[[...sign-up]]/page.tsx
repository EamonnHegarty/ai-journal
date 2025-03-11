import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center mt-40">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
