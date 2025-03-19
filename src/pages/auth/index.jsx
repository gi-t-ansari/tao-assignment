import { Suspense, lazy } from "react";
// import { CircularProgress } from "../../common";

const LazyLogin = lazy(() => import("./Login"));

export const Login = (props) => (
  <Suspense fallback={<>Loading</>}>
    <LazyLogin {...props} />
  </Suspense>
);
