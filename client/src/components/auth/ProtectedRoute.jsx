import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../main/Loader";

const ProtectedRoute = ({ children }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const location = useLocation();

    if (!isLoaded) {
        return <Loader />;
    }

    if (!isSignedIn) {
        return <Navigate to="/" replace />;
    }

    const isOnboardingPage = location.pathname === "/onboarding";
    const onboarded = user?.unsafeMetadata?.onboarded;

    // If not onboarded and trying to access any page other than onboarding, redirect to onboarding
    if (!onboarded && !isOnboardingPage) {
        return <Navigate to="/onboarding" replace />;
    }

    // If already onboarded and trying to access onboarding, redirect to dashboard
    if (onboarded && isOnboardingPage) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;