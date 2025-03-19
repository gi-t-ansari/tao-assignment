import { Suspense, lazy } from "react";
// import { CircularProgress } from "../../common";

const LazyHome = lazy(() => import("./Home"));

export const Home = (props) => (
  <Suspense fallback={<>Loading</>}>
    <LazyHome {...props} />
  </Suspense>
);
